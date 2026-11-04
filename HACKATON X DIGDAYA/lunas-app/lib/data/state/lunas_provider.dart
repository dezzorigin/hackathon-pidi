import 'package:flutter/material.dart';
import '../models/user_profile.dart';
import '../models/debt_item.dart';
import '../models/asset_item.dart';
import '../services/mock_api_service.dart';

class LunasProvider extends ChangeNotifier {
  final MockApiService _apiService;

  UserProfile _currentProfile = UserProfile.gigWorker;
  double _netWorth = 0.0;
  double _dynamicBuffer = 0.0;
  double _availableCash = 0.0;
  List<DebtItem> _debts = [];
  List<AssetItem> _assets = [];
  bool _isLoading = false;

  bool _isOnboardingCompleted = false;
  double _customDynamicBuffer = 1500000.0;

  bool _isAutoSweepEnabled = false;

  LunasProvider({required MockApiService apiService}) : _apiService = apiService {
    // Fetch initial profile data
    fetchDataForProfile(_currentProfile);
  }

  // Getters
  UserProfile get currentProfile => _currentProfile;
  double get netWorth => _netWorth;
  double get dynamicBuffer => _dynamicBuffer;
  double get availableCash => _availableCash;
  List<DebtItem> get debts => _debts;
  List<AssetItem> get assets => _assets;
  bool get isLoading => _isLoading;
  bool get isOnboardingCompleted => _isOnboardingCompleted;
  double get customDynamicBuffer => _customDynamicBuffer;
  bool get isAutoSweepEnabled => _isAutoSweepEnabled;

  void setDynamicBuffer(double value) {
    _customDynamicBuffer = value;
    _dynamicBuffer = value; // Keep them synced
    notifyListeners();
  }

  void completeOnboarding() {
    _isOnboardingCompleted = true;
    notifyListeners();
  }

  void toggleAutoSweep(bool value) {
    _isAutoSweepEnabled = value;
    notifyListeners();
  }

  void sweepDebt(double amount) {
    if (_availableCash < amount) return;
    _availableCash -= amount;

    // Update asset list
    for (int i = 0; i < _assets.length; i++) {
      if (_assets[i].name.contains('Cash') || _assets[i].name.contains('Bank') || _assets[i].name.contains('Operational')) {
        _assets[i] = AssetItem(name: _assets[i].name, amount: _assets[i].amount - amount);
        break;
      }
    }

    // Find priority or highest APR debt
    if (_debts.isNotEmpty) {
      // Sort debts by APR descending
      final tempDebts = List<DebtItem>.from(_debts);
      tempDebts.sort((a, b) => b.interestRateAPR.compareTo(a.interestRateAPR));
      final highestDebt = tempDebts.first;
      final newAmount = (highestDebt.amount - amount).clamp(0.0, double.infinity);
      
      final index = _debts.indexWhere((element) => element.name == highestDebt.name);
      if (index != -1) {
        if (newAmount == 0) {
          _debts.removeAt(index);
        } else {
          _debts[index] = DebtItem(
            name: highestDebt.name,
            amount: newAmount,
            interestRateAPR: highestDebt.interestRateAPR,
            isPriority: highestDebt.isPriority,
          );
        }
      }
    }

    // Recalculate net worth
    double totalAssets = _assets.fold(0.0, (sum, item) => sum + item.amount);
    double totalDebts = _debts.fold(0.0, (sum, item) => sum + item.amount);
    _netWorth = totalAssets - totalDebts;

    notifyListeners();
  }

  /// Changes the user profile and loads the corresponding dashboard metrics
  Future<void> changeProfile(UserProfile newProfile) async {
    if (_currentProfile == newProfile && _debts.isNotEmpty) return;
    _currentProfile = newProfile;
    notifyListeners();
    await fetchDataForProfile(newProfile);
  }

  /// Fetches data from the MockApiService
  Future<void> fetchDataForProfile(UserProfile profile) async {
    _isLoading = true;
    notifyListeners();

    try {
      final data = await _apiService.fetchDashboardData(profile);
      _netWorth = data['netWorth'] as double;
      _dynamicBuffer = data['dynamicBuffer'] as double;
      _availableCash = data['availableCash'] as double;
      
      final debtsJson = data['debts'] as List<dynamic>;
      _debts = debtsJson.map((e) => DebtItem.fromJson(e as Map<String, dynamic>)).toList();

      final assetsJson = data['assets'] as List<dynamic>;
      _assets = assetsJson.map((e) => AssetItem.fromJson(e as Map<String, dynamic>)).toList();
    } catch (e) {
      debugPrint('Error fetching data in LunasProvider: $e');
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Helper to get formatted status of the current profile
  String get profileName {
    switch (_currentProfile) {
      case UserProfile.gigWorker:
        return 'Freelance/Gig Worker';
      case UserProfile.debtFocused:
        return 'Debt Payoff Focus';
      case UserProfile.wealthFocused:
        return 'Wealth Accumulator';
    }
  }
}
