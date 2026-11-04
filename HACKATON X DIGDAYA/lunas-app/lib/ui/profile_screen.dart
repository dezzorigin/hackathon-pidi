import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/state/lunas_provider.dart';
import '../data/models/user_profile.dart';
import '../theme/lunas_theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  bool _isBiometricEnabled = true;

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<LunasProvider>(context);

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // User profile top header info
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 3),
              borderRadius: BorderRadius.circular(16),
              boxShadow: LunasTheme.neoShadow,
            ),
            child: Row(
              children: [
                Container(
                  width: 64,
                  height: 64,
                  decoration: BoxDecoration(
                    color: const Color(0xFFFFDE6A), // yellow
                    shape: BoxShape.circle,
                    border: Border.all(color: Colors.black, width: 3),
                  ),
                  child: const Center(
                    child: Text(
                      'N',
                      style: TextStyle(
                        fontWeight: FontWeight.w900,
                        fontSize: 28,
                        color: Colors.black,
                      ),
                    ),
                  ),
                ),
                const SizedBox(width: 20),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'Nabil Lauliadka',
                        style: TextStyle(fontSize: 22, fontWeight: FontWeight.w900),
                      ),
                      const SizedBox(height: 2),
                      Text(
                        'nabil@lunas.ai',
                        style: TextStyle(fontSize: 13, color: Colors.grey[600], fontWeight: FontWeight.bold),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),

          // SECTION 1: Active CFO Profile select mode
          const Text(
            'ACTIVE CFO FOCUS MODE',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 1.0, color: Colors.black54),
          ),
          const SizedBox(height: 12),
          _buildProfileSelectButton(
            title: 'Gig Worker & Freelancer',
            description: 'Preserve dynamic safety runway buffers.',
            profile: UserProfile.gigWorker,
            state: state,
          ),
          const SizedBox(height: 12),
          _buildProfileSelectButton(
            title: 'Debt Recovery (Avalanche)',
            description: 'Prioritize payoff of high-APR liabilities.',
            profile: UserProfile.debtFocused,
            state: state,
          ),
          const SizedBox(height: 12),
          _buildProfileSelectButton(
            title: 'Wealth Accumulator',
            description: 'Sweep daily surplus cash into RDPU yields.',
            profile: UserProfile.wealthFocused,
            state: state,
          ),
          const SizedBox(height: 32),

          // SECTION 2: Dynamic Buffer limits
          const Text(
            'DYNAMIC BUFFER LIMITS',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 1.0, color: Colors.black54),
          ),
          const SizedBox(height: 12),
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 2.5),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    const Text('Daily Living Buffer', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16)),
                    Text(
                      'Rp ${state.dynamicBuffer.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                      style: const TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.w900,
                        color: LunasTheme.primaryIndigo,
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                SliderTheme(
                  data: SliderTheme.of(context).copyWith(
                    activeTrackColor: LunasTheme.primaryIndigo,
                    inactiveTrackColor: Colors.grey[200],
                    thumbColor: Colors.white,
                    overlayColor: LunasTheme.primaryIndigo.withAlpha(51),
                    thumbShape: const RoundSliderThumbShape(enabledThumbRadius: 10),
                  ),
                  child: Slider(
                    value: state.dynamicBuffer.clamp(500000.0, 5000000.0),
                    min: 500000.0,
                    max: 5000000.0,
                    divisions: 9,
                    onChanged: (value) {
                      state.setDynamicBuffer(value);
                    },
                  ),
                ),
                const Text(
                  'Mengubah batas buffer akan memperbarui indikator cashflow runway dan batas dana aman belanja pada beranda.',
                  style: TextStyle(fontSize: 11, color: Colors.black54, fontWeight: FontWeight.bold, height: 1.3),
                ),
              ],
            ),
          ),
          const SizedBox(height: 32),

          // SECTION 3: Linked Bank Accounts via SNAP BI
          const Text(
            'LINKED OPEN BANKING (SNAP BI)',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 1.0, color: Colors.black54),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 2.5),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Column(
              children: [
                _buildBankTile('Bank BCA', 'Operational Account', true),
                const Divider(height: 1, thickness: 1.5, color: Colors.black12),
                _buildBankTile('GoPay Wallet', 'E-Money Cash', true),
                const Divider(height: 1, thickness: 1.5, color: Colors.black12),
                _buildBankTile('Kredivo Paylater', 'Liability Account', true),
              ],
            ),
          ),
          const SizedBox(height: 32),

          // SECTION 4: Security settings
          const Text(
            'SECURITY & PREFERENCES',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 12, letterSpacing: 1.0, color: Colors.black54),
          ),
          const SizedBox(height: 12),
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 16),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 2.5),
              borderRadius: BorderRadius.circular(16),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Biometric 2FA Approval', style: TextStyle(fontWeight: FontWeight.w900, fontSize: 15)),
                    const SizedBox(height: 2),
                    Text('Otorisasi instan saat melakukan sweep.', style: TextStyle(fontSize: 11, color: Colors.grey[700], fontWeight: FontWeight.bold)),
                  ],
                ),
                Switch(
                  value: _isBiometricEnabled,
                  onChanged: (val) {
                    setState(() {
                      _isBiometricEnabled = val;
                    });
                  },
                  activeThumbColor: LunasTheme.primaryIndigo,
                  activeTrackColor: LunasTheme.primaryIndigo.withAlpha(51),
                  inactiveThumbColor: Colors.white,
                  inactiveTrackColor: Colors.grey[300],
                ),
              ],
            ),
          ),
          const SizedBox(height: 48),
        ],
      ),
    );
  }

  Widget _buildProfileSelectButton({
    required String title,
    required String description,
    required UserProfile profile,
    required LunasProvider state,
  }) {
    final isSelected = state.currentProfile == profile;
    return GestureDetector(
      onTap: () => state.changeProfile(profile),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: isSelected ? LunasTheme.primaryIndigo.withAlpha(20) : Colors.white,
          border: Border.all(
            color: isSelected ? LunasTheme.primaryIndigo : Colors.black,
            width: isSelected ? 3.0 : 2.0,
          ),
          borderRadius: BorderRadius.circular(12),
          boxShadow: isSelected ? LunasTheme.neoShadowSmall : null,
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 15,
                      color: isSelected ? LunasTheme.primaryIndigo : Colors.black,
                    ),
                  ),
                  const SizedBox(height: 2),
                  Text(
                    description,
                    style: TextStyle(fontSize: 11, color: Colors.grey[700], fontWeight: FontWeight.bold),
                  ),
                ],
              ),
            ),
            if (isSelected)
              const Icon(Icons.check_circle, color: LunasTheme.primaryIndigo, size: 20)
          ],
        ),
      ),
    );
  }

  Widget _buildBankTile(String name, String type, bool isConnected) {
    return ListTile(
      leading: Container(
        padding: const EdgeInsets.all(8),
        decoration: BoxDecoration(
          color: LunasTheme.primaryIndigo.withAlpha(20),
          shape: BoxShape.circle,
        ),
        child: Icon(
          name.contains('BCA')
              ? Icons.account_balance
              : (name.contains('GoPay') ? Icons.wallet : Icons.credit_card),
          color: LunasTheme.primaryIndigo,
          size: 20,
        ),
      ),
      title: Text(name, style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 15)),
      subtitle: Text(type, style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: Colors.black45)),
      trailing: Container(
        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
        decoration: BoxDecoration(
          color: LunasTheme.emeraldGreen.withAlpha(38),
          borderRadius: BorderRadius.circular(20),
          border: Border.all(color: LunasTheme.emeraldGreen, width: 1.5),
        ),
        child: const Text(
          'ACTIVE',
          style: TextStyle(color: LunasTheme.emeraldGreen, fontWeight: FontWeight.w900, fontSize: 9),
        ),
      ),
    );
  }
}
