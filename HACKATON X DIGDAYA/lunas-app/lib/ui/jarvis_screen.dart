import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/state/lunas_provider.dart';
import '../theme/lunas_theme.dart';

class JarvisScreen extends StatefulWidget {
  const JarvisScreen({super.key});

  @override
  State<JarvisScreen> createState() => _JarvisScreenState();
}

class _JarvisScreenState extends State<JarvisScreen> {
  bool _showNudgeCard = true;
  bool _isSweeping = false;

  void _triggerNudgeSweep(LunasProvider provider) async {
    setState(() {
      _isSweeping = true;
    });

    // Simulate open banking sync
    await Future.delayed(const Duration(milliseconds: 1000));

    if (mounted) {
      // Sweep Rp 350,000 to highest APR debt
      provider.sweepDebt(350000.0);
      setState(() {
        _isSweeping = false;
        _showNudgeCard = false;
      });

      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(
          behavior: SnackBarBehavior.floating,
          backgroundColor: Colors.transparent,
          elevation: 0,
          content: Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: LunasTheme.emeraldGreen,
              border: Border.all(color: Colors.black, width: 2.5),
              borderRadius: BorderRadius.circular(12),
              boxShadow: const [
                BoxShadow(color: Colors.black, offset: Offset(2, 2))
              ],
            ),
            child: const Row(
              children: [
                Icon(Icons.check_circle, color: Colors.white, size: 28),
                SizedBox(width: 12),
                Expanded(
                  child: Text(
                    'Impulsive Buy Dicegah! Rp 350.000 dialihkan untuk melunasi utang.',
                    style: TextStyle(
                      color: Colors.white,
                      fontWeight: FontWeight.w800,
                      fontSize: 14,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<LunasProvider>(context);

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Screen Header
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Jarvis AI CFO',
                    style: Theme.of(context).textTheme.displayMedium?.copyWith(
                          fontSize: 28,
                          height: 1.1,
                        ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'Autonomous Financial Guardian Feed',
                    style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black54),
                  ),
                ],
              ),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                decoration: BoxDecoration(
                  color: const Color(0xFFE0E7FF), // Soft indigo
                  border: Border.all(color: Colors.black, width: 2),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Text(
                  'ACTIVE LUNA-1',
                  style: TextStyle(fontSize: 10, fontWeight: FontWeight.w900, color: LunasTheme.primaryIndigo),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Primary Tokopedia Nudge Card
          if (_showNudgeCard && state.debts.isNotEmpty) ...[
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color(0xFFFEF3C7), // Brutalist warm amber
                border: Border.all(color: Colors.black, width: 3.0),
                borderRadius: BorderRadius.circular(16),
                boxShadow: LunasTheme.neoShadow,
              ),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                        decoration: BoxDecoration(
                          color: LunasTheme.coralRed,
                          border: Border.all(color: Colors.black, width: 1.5),
                          borderRadius: BorderRadius.circular(20),
                        ),
                        child: const Text(
                          '⚠️ BEHAVIORAL WARNING',
                          style: TextStyle(
                            color: Colors.white,
                            fontWeight: FontWeight.w900,
                            fontSize: 9,
                          ),
                        ),
                      ),
                      IconButton(
                        onPressed: () {
                          setState(() {
                            _showNudgeCard = false;
                          });
                        },
                        icon: const Icon(Icons.close, size: 20),
                        padding: EdgeInsets.zero,
                        constraints: const BoxConstraints(),
                      ),
                    ],
                  ),
                  const SizedBox(height: 16),
                  const Text(
                    'Transaction Blocked?',
                    style: TextStyle(fontWeight: FontWeight.w900, fontSize: 20, color: LunasTheme.neoBlack),
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'You are about to spend Rp 350.000 on Tokopedia. Proceeding will delay your debt-free target by 6 days.',
                    style: TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.bold,
                      color: Colors.black87,
                      height: 1.4,
                    ),
                  ),
                  const SizedBox(height: 20),
                  Row(
                    children: [
                      Expanded(
                        flex: 2,
                        child: ElevatedButton(
                          onPressed: _isSweeping ? null : () => _triggerNudgeSweep(state),
                          style: ElevatedButton.styleFrom(
                            backgroundColor: LunasTheme.emeraldGreen,
                            foregroundColor: Colors.white,
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            textStyle: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13),
                          ),
                          child: _isSweeping
                              ? const SizedBox(
                                  width: 18,
                                  height: 18,
                                  child: CircularProgressIndicator(color: Colors.white, strokeWidth: 2.5),
                                )
                              : const Text('CANCEL & SWEEP TO DEBT'),
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        flex: 1,
                        child: OutlinedButton(
                          onPressed: () {
                            setState(() {
                              _showNudgeCard = false;
                            });
                          },
                          style: OutlinedButton.styleFrom(
                            padding: const EdgeInsets.symmetric(vertical: 14),
                            textStyle: const TextStyle(fontWeight: FontWeight.w900, fontSize: 13),
                          ),
                          child: const Text('IGNORE'),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            const SizedBox(height: 24),
          ],

          // Audit Feed Header
          const Text(
            'Jarvis CFO Audit Feed',
            style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
          ),
          const SizedBox(height: 16),

          // Card 2: Weekly Freelance Tax Reserves
          _buildFeedItem(
            title: 'Weekly Tax Reserve Optimized',
            description: 'Rp 450.000 dialokasikan secara otonom ke kantong pajak cadangan berdasarkan rata-rata volatilitas gig income Anda minggu ini.',
            icon: Icons.pie_chart,
            time: '2 hours ago',
          ),
          const SizedBox(height: 16),

          // Card 3: SNAP Bank Sync Successful
          _buildFeedItem(
            title: 'SNAP Banking Synchronized',
            description: 'Data open banking berhasil disinkronisasi untuk Bank BCA, GoPay, dan Kredivo. Saldo & tagihan diperbarui secara otonom.',
            icon: Icons.sync,
            time: '3 hours ago',
            isSuccess: true,
          ),
          const SizedBox(height: 16),

          // Card 4: Dynamic Buffer Analysis
          _buildFeedItem(
            title: 'Batas Kas Aman Diperbarui',
            description: 'Batas daily living balance Anda disesuaikan untuk mencakup inflasi biaya hidup freelancing minggu ini.',
            icon: Icons.show_chart,
            time: '1 day ago',
          ),
        ],
      ),
    );
  }

  Widget _buildFeedItem({
    required String title,
    required String description,
    required IconData icon,
    required String time,
    bool isSuccess = false,
  }) {
    return Container(
      width: double.infinity,
      padding: const EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black, width: 2.5),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            padding: const EdgeInsets.all(8),
            decoration: BoxDecoration(
              color: isSuccess ? LunasTheme.emeraldGreen.withAlpha(26) : LunasTheme.primaryIndigo.withAlpha(26),
              shape: BoxShape.circle,
            ),
            child: Icon(
              icon,
              color: isSuccess ? LunasTheme.emeraldGreen : LunasTheme.primaryIndigo,
              size: 20,
            ),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                ),
                const SizedBox(height: 6),
                Text(
                  description,
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[700],
                    height: 1.4,
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  time,
                  style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.black38),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
