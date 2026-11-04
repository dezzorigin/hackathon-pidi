import 'dart:async';
import '../models/user_profile.dart';

class MockApiService {
  /// Simulates fetching dashboard data with a 2-second delay.
  Future<Map<String, dynamic>> fetchDashboardData(UserProfile profile) async {
    await Future.delayed(const Duration(seconds: 2));

    switch (profile) {
      case UserProfile.gigWorker:
        return {
          'netWorth': 2500000.0,
          'dynamicBuffer': 3000000.0,
          'availableCash': 1500000.0,
          'debts': [
            {
              'name': 'Gopay Later',
              'amount': 500000.0,
              'interestRateAPR': 0.15,
              'isPriority': false,
            }
          ],
          'assets': [
            {
              'name': 'Cash on Hand',
              'amount': 1500000.0,
            },
            {
              'name': 'Unpaid Client Invoice',
              'amount': 1500000.0,
            }
          ],
        };

      case UserProfile.debtFocused:
        return {
          'netWorth': -11800000.0,
          'dynamicBuffer': 500000.0,
          'availableCash': 2200000.0,
          'debts': [
            {
              'name': 'Kredivo Paylater',
              'amount': 8000000.0,
              'interestRateAPR': 0.42,
              'isPriority': true, // priority for Avalanche payoff
            },
            {
              'name': 'Akulaku Pinjol',
              'amount': 6000000.0,
              'interestRateAPR': 0.36,
              'isPriority': false,
            }
          ],
          'assets': [
            {
              'name': 'Operational Cash',
              'amount': 2200000.0,
            }
          ],
        };

      case UserProfile.wealthFocused:
        return {
          'netWorth': 45000000.0,
          'dynamicBuffer': 5000000.0,
          'availableCash': 10000000.0,
          'debts': <Map<String, dynamic>>[],
          'assets': [
            {
              'name': 'Primary Bank Account',
              'amount': 10000000.0,
            },
            {
              'name': 'Indopremier RDPU (Mutual Fund)',
              'amount': 25000000.0,
            },
            {
              'name': 'Stock Portfolio',
              'amount': 10000000.0,
            }
          ],
        };
    }
  }
}
