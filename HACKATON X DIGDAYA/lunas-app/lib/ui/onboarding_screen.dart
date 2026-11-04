import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/state/lunas_provider.dart';
import '../data/models/user_profile.dart';
import '../theme/lunas_theme.dart';

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final PageController _pageController = PageController();
  int _currentPage = 0;

  // CFO Interview selection
  UserProfile? _selectedProfile;

  // Account sync statuses (0 = not connected, 1 = loading, 2 = connected)
  final Map<String, int> _syncStatuses = {
    'Bank BCA': 0,
    'GoPay': 0,
    'Kredivo': 0,
  };

  // Dynamic Buffer slider value
  double _bufferValue = 1500000.0;

  void _nextPage() {
    _pageController.nextPage(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  void _prevPage() {
    _pageController.previousPage(
      duration: const Duration(milliseconds: 300),
      curve: Curves.easeInOut,
    );
  }

  Future<void> _connectAccount(String accountName) async {
    setState(() {
      _syncStatuses[accountName] = 1; // Loading
    });

    await Future.delayed(const Duration(seconds: 2));

    if (mounted) {
      setState(() {
        _syncStatuses[accountName] = 2; // Connected
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<LunasProvider>(context, listen: false);

    return Scaffold(
      backgroundColor: LunasTheme.bgOffWhite,
      body: SafeArea(
        child: Column(
          children: [
            // Top Progress Bar
            _buildProgressBar(),
            Expanded(
              child: PageView(
                controller: _pageController,
                physics: const NeverScrollableScrollPhysics(),
                onPageChanged: (page) {
                  setState(() {
                    _currentPage = page;
                  });
                },
                children: [
                  _buildWelcomePage(),
                  _buildInterviewPage(provider),
                  _buildConnectPage(),
                  _buildBufferPage(provider),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildProgressBar() {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
      child: Row(
        children: List.generate(4, (index) {
          final isCompleted = index < _currentPage;
          final isCurrent = index == _currentPage;
          return Expanded(
            child: Container(
              height: 10,
              margin: const EdgeInsets.symmetric(horizontal: 4),
              decoration: BoxDecoration(
                color: isCompleted
                    ? LunasTheme.emeraldGreen
                    : (isCurrent ? LunasTheme.primaryIndigo : Colors.grey[300]),
                border: Border.all(color: Colors.black, width: 2),
                borderRadius: BorderRadius.circular(4),
              ),
            ),
          );
        }),
      ),
    );
  }

  // STEP 1: Welcome Screen
  Widget _buildWelcomePage() {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // LUNAS Bold Logo
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 3.5),
              boxShadow: LunasTheme.neoShadow,
              borderRadius: BorderRadius.circular(16),
            ),
            child: const Text(
              'LUNAS',
              style: TextStyle(
                fontSize: 48,
                fontWeight: FontWeight.w800,
                color: LunasTheme.primaryIndigo,
                letterSpacing: 2,
              ),
            ),
          ),
          const SizedBox(height: 48),
          const Text(
            'Biar AI yang mikirin utangmu, kamu tinggal nikmatin hidup.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 28,
              fontWeight: FontWeight.w800,
              color: LunasTheme.neoBlack,
              height: 1.3,
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Asisten Finansial Otonom (Personal CFO) yang membantu Anda bertahan hidup, melunasi utang, hingga melipatgandakan aset.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 16,
              color: Colors.black87,
              height: 1.5,
            ),
          ),
          const SizedBox(height: 64),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: _nextPage,
              child: const Text('GET STARTED'),
            ),
          ),
        ],
      ),
    );
  }

  // STEP 2: CFO Interview Screen
  Widget _buildInterviewPage(LunasProvider provider) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'CFO Interview',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: LunasTheme.primaryIndigo,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'What is your main financial focus right now?',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: LunasTheme.neoBlack,
            ),
          ),
          const SizedBox(height: 24),
          Expanded(
            child: ListView(
              children: [
                _buildProfileCard(
                  title: 'Atur Cashflow Harian',
                  subtitle: 'Gig Economy / Freelance',
                  description: 'Menjaga bantalan kas dinamis untuk menghadapi pendapatan tidak menentu.',
                  profile: UserProfile.gigWorker,
                ),
                const SizedBox(height: 16),
                _buildProfileCard(
                  title: 'Lunasi Utang Pinjol',
                  subtitle: 'Debt Recovery Focus',
                  description: 'Menerapkan metode Avalanche untuk melunasi utang bunga tinggi secepat mungkin.',
                  profile: UserProfile.debtFocused,
                ),
                const SizedBox(height: 16),
                _buildProfileCard(
                  title: 'Fokus Investasi',
                  subtitle: 'Wealth Expander',
                  description: 'Mengoptimalkan sisa dana menganggur ke Reksa Dana Pasar Uang (RDPU).',
                  profile: UserProfile.wealthFocused,
                ),
              ],
            ),
          ),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: _prevPage,
                  child: const Text('BACK'),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: _selectedProfile != null
                      ? () {
                          provider.changeProfile(_selectedProfile!);
                          _nextPage();
                        }
                      : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: _selectedProfile != null
                        ? LunasTheme.primaryIndigo
                        : Colors.grey[400],
                  ),
                  child: const Text('NEXT'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildProfileCard({
    required String title,
    required String subtitle,
    required String description,
    required UserProfile profile,
  }) {
    final isSelected = _selectedProfile == profile;
    return GestureDetector(
      onTap: () {
        setState(() {
          _selectedProfile = profile;
        });
      },
      child: Container(
        padding: const EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: isSelected ? LunasTheme.primaryIndigo.withAlpha(20) : Colors.white,
          border: Border.all(
            color: isSelected ? LunasTheme.primaryIndigo : Colors.black,
            width: isSelected ? 3.5 : 2.5,
          ),
          borderRadius: BorderRadius.circular(16),
          boxShadow: isSelected ? LunasTheme.neoShadowSmall : null,
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  title,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: isSelected ? LunasTheme.primaryIndigo : LunasTheme.neoBlack,
                  ),
                ),
                if (isSelected)
                  const Icon(Icons.check_circle, color: LunasTheme.primaryIndigo, size: 24),
              ],
            ),
            const SizedBox(height: 4),
            Text(
              subtitle,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.bold,
                color: isSelected ? LunasTheme.primaryIndigo : Colors.black54,
              ),
            ),
            const SizedBox(height: 12),
            Text(
              description,
              style: const TextStyle(
                fontSize: 14,
                color: Colors.black87,
                height: 1.4,
              ),
            ),
          ],
        ),
      ),
    );
  }

  // STEP 3: Connect Accounts (SNAP BI Simulation)
  Widget _buildConnectPage() {
    final connectedCount = _syncStatuses.values.where((status) => status == 2).length;
    final isAnyConnected = connectedCount > 0;

    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Open Banking Sync',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: LunasTheme.primaryIndigo,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Hubungkan Akun Keuangan',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: LunasTheme.neoBlack,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Hubungkan minimal satu akun untuk mengambil data saldo & tagihan secara otonom.',
            style: TextStyle(fontSize: 14, color: Colors.black87),
          ),
          const SizedBox(height: 24),
          Expanded(
            child: ListView(
              children: _syncStatuses.keys.map((account) {
                final status = _syncStatuses[account]!;
                return Container(
                  margin: const EdgeInsets.only(bottom: 16),
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: Colors.black, width: 2.5),
                    borderRadius: BorderRadius.circular(16),
                  ),
                  child: Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          color: LunasTheme.primaryIndigo.withAlpha(26),
                          shape: BoxShape.circle,
                        ),
                        child: Icon(
                          account == 'Bank BCA'
                              ? Icons.account_balance
                              : (account == 'GoPay' ? Icons.wallet : Icons.credit_card),
                          color: LunasTheme.primaryIndigo,
                          size: 24,
                        ),
                      ),
                      const SizedBox(width: 16),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              account,
                              style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                            ),
                            const SizedBox(height: 2),
                            Text(
                              status == 2 ? 'Connected via SNAP BI' : 'Not Syncing',
                              style: TextStyle(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                                color: status == 2 ? LunasTheme.emeraldGreen : Colors.black54,
                              ),
                            ),
                          ],
                        ),
                      ),
                      _buildConnectStatusAction(account, status),
                    ],
                  ),
                );
              }).toList(),
            ),
          ),
          // Disclaimer
          Container(
            padding: const EdgeInsets.all(12),
            decoration: BoxDecoration(
              color: Colors.grey[200],
              border: Border.all(color: Colors.black, width: 1.5),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Row(
              children: [
                Icon(Icons.security, size: 20, color: Colors.black54),
                SizedBox(width: 8),
                Expanded(
                  child: Text(
                    'Akses read-only via SNAP BI. Kredensial Anda aman dan tidak pernah disimpan oleh LUNAS.',
                    style: TextStyle(fontSize: 11, color: Colors.black54, height: 1.3),
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: _prevPage,
                  child: const Text('BACK'),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: isAnyConnected ? _nextPage : null,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: isAnyConnected ? LunasTheme.primaryIndigo : Colors.grey[400],
                  ),
                  child: const Text('NEXT'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildConnectStatusAction(String account, int status) {
    if (status == 1) {
      return const SizedBox(
        width: 24,
        height: 24,
        child: CircularProgressIndicator(strokeWidth: 3, valueColor: AlwaysStoppedAnimation(LunasTheme.primaryIndigo)),
      );
    } else if (status == 2) {
      return Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
        decoration: BoxDecoration(
          color: LunasTheme.emeraldGreen.withAlpha(38),
          border: Border.all(color: LunasTheme.emeraldGreen, width: 2),
          borderRadius: BorderRadius.circular(20),
        ),
        child: const Text(
          'CONNECTED',
          style: TextStyle(
            color: LunasTheme.emeraldGreen,
            fontWeight: FontWeight.w800,
            fontSize: 11,
          ),
        ),
      );
    } else {
      return OutlinedButton(
        onPressed: () => _connectAccount(account),
        style: OutlinedButton.styleFrom(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
          minimumSize: Size.zero,
          textStyle: const TextStyle(fontSize: 12, fontWeight: FontWeight.w800),
        ),
        child: const Text('CONNECT'),
      );
    }
  }

  // STEP 4: Dynamic Buffer Setup
  Widget _buildBufferPage(LunasProvider provider) {
    return Padding(
      padding: const EdgeInsets.all(24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Risk Management',
            style: TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.bold,
              color: LunasTheme.primaryIndigo,
            ),
          ),
          const SizedBox(height: 8),
          const Text(
            'Batas Aman Kas Harian',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.w800,
              color: LunasTheme.neoBlack,
            ),
          ),
          const SizedBox(height: 12),
          const Text(
            'LUNAS AI akan memastikan saldo Anda tidak turun di bawah batas ini agar biaya hidup harian tetap aman sebelum membayar utang atau investasi.',
            style: TextStyle(fontSize: 14, color: Colors.black87, height: 1.4),
          ),
          const SizedBox(height: 48),
          Center(
            child: Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: Colors.black, width: 3),
                borderRadius: BorderRadius.circular(16),
                boxShadow: LunasTheme.neoShadow,
              ),
              child: Column(
                children: [
                  const Text(
                    'MINIMUM DAILY LIVING BALANCE',
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 12,
                      color: Colors.black54,
                    ),
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Rp ${_bufferValue.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                    style: const TextStyle(
                      fontSize: 32,
                      fontWeight: FontWeight.w800,
                      color: LunasTheme.primaryIndigo,
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 36),
          SliderTheme(
            data: SliderTheme.of(context).copyWith(
              activeTrackColor: LunasTheme.primaryIndigo,
              inactiveTrackColor: Colors.grey[300],
              thumbColor: Colors.white,
              overlayColor: LunasTheme.primaryIndigo.withAlpha(51),
              thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 14),
            ),
            child: Slider(
              value: _bufferValue,
              min: 500000.0,
              max: 5000000.0,
              divisions: 9,
              onChanged: (value) {
                setState(() {
                  _bufferValue = value;
                });
              },
            ),
          ),
          const Padding(
            padding: EdgeInsets.symmetric(horizontal: 16.0),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('Rp 500rb', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
                Text('Rp 5jt', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 12)),
              ],
            ),
          ),
          const Spacer(),
          Row(
            children: [
              Expanded(
                child: OutlinedButton(
                  onPressed: _prevPage,
                  child: const Text('BACK'),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    provider.setDynamicBuffer(_bufferValue);
                    provider.completeOnboarding();
                  },
                  child: const Text('FINISH & ACCESS CFO'),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
