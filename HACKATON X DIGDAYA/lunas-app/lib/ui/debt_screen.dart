import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/state/lunas_provider.dart';
import '../data/models/debt_item.dart';
import '../theme/lunas_theme.dart';

class DebtScreen extends StatefulWidget {
  const DebtScreen({super.key});

  @override
  State<DebtScreen> createState() => _DebtScreenState();
}

class _DebtScreenState extends State<DebtScreen> {
  bool _isPaying = false;
  bool _paySuccess = false;

  void _showBiometricPaySheet(BuildContext context, DebtItem debt, LunasProvider state) {
    // Determine sweep amount based on available cash surplus
    final surplus = (state.availableCash - state.dynamicBuffer).clamp(0.0, double.infinity);
    final sweepAmount = surplus >= 800000.0 ? 800000.0 : surplus;

    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      isScrollControlled: true,
      builder: (sheetContext) {
        return StatefulBuilder(
          builder: (BuildContext context, StateSetter setSheetState) {
            return Container(
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 32),
              decoration: const BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(24),
                  topRight: Radius.circular(24),
                ),
                border: Border(
                  top: BorderSide(color: Colors.black, width: 3.5),
                  left: BorderSide(color: Colors.black, width: 3.5),
                  right: BorderSide(color: Colors.black, width: 3.5),
                ),
              ),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  // Pull pill
                  Container(
                    width: 40,
                    height: 6,
                    decoration: BoxDecoration(
                      color: Colors.black,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                  const SizedBox(height: 24),
                  const Icon(Icons.fingerprint, size: 72, color: LunasTheme.primaryIndigo),
                  const SizedBox(height: 16),
                  const Text(
                    'Biometric Approval Required',
                    style: TextStyle(fontSize: 20, fontWeight: FontWeight.w900),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Otorisasi pembayaran Rp ${sweepAmount.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')} ke ${debt.name} dari saldo aman Anda.',
                    textAlign: TextAlign.center,
                    style: const TextStyle(fontSize: 14, fontWeight: FontWeight.bold, color: Colors.black54),
                  ),
                  const SizedBox(height: 24),
                  if (_isPaying)
                    const Column(
                      children: [
                        CircularProgressIndicator(valueColor: AlwaysStoppedAnimation(LunasTheme.primaryIndigo), strokeWidth: 4),
                        SizedBox(height: 16),
                        Text('Menghubungkan SNAP Open Banking...', style: TextStyle(fontWeight: FontWeight.bold)),
                      ],
                    )
                  else if (_paySuccess)
                    const Column(
                      children: [
                        Icon(Icons.check_circle, color: LunasTheme.emeraldGreen, size: 48),
                        SizedBox(height: 12),
                        Text('Pembayaran Berhasil Diotorisasi!', style: TextStyle(fontWeight: FontWeight.w900, color: LunasTheme.emeraldGreen)),
                      ],
                    )
                  else
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton(
                            onPressed: () => Navigator.pop(sheetContext),
                            child: const Text('CANCEL'),
                          ),
                        ),
                        const SizedBox(width: 16),
                        Expanded(
                          child: ElevatedButton(
                            onPressed: sweepAmount > 0
                                ? () async {
                                    setSheetState(() {
                                      _isPaying = true;
                                    });

                                    // Simulate biometric scan & bank api handshake
                                    await Future.delayed(const Duration(seconds: 1));

                                    if (sheetContext.mounted) {
                                      setSheetState(() {
                                        _isPaying = false;
                                        _paySuccess = true;
                                      });
                                    }

                                    // Process the debt paydown in state
                                    state.sweepDebt(sweepAmount);

                                    await Future.delayed(const Duration(milliseconds: 800));
                                    if (sheetContext.mounted) {
                                      Navigator.pop(sheetContext);
                                    }
                                    setState(() {
                                      _paySuccess = false;
                                    });
                                  }
                                : null,
                            style: ElevatedButton.styleFrom(
                              backgroundColor: LunasTheme.primaryIndigo,
                              foregroundColor: Colors.white,
                            ),
                            child: const Text('APPROVE'),
                          ),
                        ),
                      ],
                    ),
                  const SizedBox(height: 12),
                ],
              ),
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<LunasProvider>(context);

    // Calculate dynamic stats
    final totalDebt = state.debts.fold(0.0, (sum, item) => sum + item.amount);
    
    // We assume baseline starting debt is 36,800,000 IDR to get ~62% at 14,000,000 IDR current
    const double baselineDebt = 36800000.0;
    final progress = totalDebt > 0 
        ? ((baselineDebt - totalDebt) / baselineDebt).clamp(0.0, 1.0)
        : 1.0;
    
    // Sort debts by APR descending (Avalanche order)
    final sortedDebts = List<DebtItem>.from(state.debts);
    sortedDebts.sort((a, b) => b.interestRateAPR.compareTo(a.interestRateAPR));

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 24),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Dynamic Top Progress Section
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(24),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 3),
              borderRadius: BorderRadius.circular(16),
              boxShadow: LunasTheme.neoShadow,
            ),
            child: Column(
              children: [
                // Semi-circular or circular progress row
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Stack(
                      alignment: Alignment.center,
                      children: [
                        SizedBox(
                          width: 100,
                          height: 100,
                          child: CircularProgressIndicator(
                            value: progress,
                            strokeWidth: 10,
                            backgroundColor: Colors.grey[200],
                            valueColor: const AlwaysStoppedAnimation<Color>(LunasTheme.primaryIndigo),
                          ),
                        ),
                        Text(
                          '${(progress * 100).toStringAsFixed(0)}%',
                          style: const TextStyle(
                            fontSize: 24,
                            fontWeight: FontWeight.w900,
                            color: LunasTheme.primaryIndigo,
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(width: 24),
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          const Text(
                            'DEBT-FREE PROGRESS',
                            style: TextStyle(
                              fontWeight: FontWeight.bold,
                              fontSize: 11,
                              letterSpacing: 1.0,
                              color: Colors.black54,
                            ),
                          ),
                          const SizedBox(height: 4),
                          Text(
                            progress >= 1.0 ? 'Bebas Utang!' : 'Sedikit lagi lunas!',
                            style: const TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w900,
                              color: LunasTheme.neoBlack,
                            ),
                          ),
                          const SizedBox(height: 2),
                          Text(
                            'Target: Bebas bunga tinggi.',
                            style: TextStyle(fontSize: 12, color: Colors.grey[600], fontWeight: FontWeight.bold),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
                const Divider(height: 32, thickness: 2, color: Colors.black12),
                // Massive outstanding debt text
                Align(
                  alignment: Alignment.centerLeft,
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text(
                        'TOTAL OUTSTANDING DEBT',
                        style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 12,
                          letterSpacing: 1.0,
                          color: Colors.black54,
                        ),
                      ),
                      const SizedBox(height: 6),
                      Text(
                        'Rp ${totalDebt.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                        style: const TextStyle(
                          fontSize: 34,
                          fontWeight: FontWeight.w900,
                          color: LunasTheme.coralRed,
                          letterSpacing: -0.5,
                        ),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 24),

          // Filter chip subtitle banner
          Container(
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
            decoration: BoxDecoration(
              color: const Color(0xFFFEE2E2), // soft light red
              border: Border.all(color: Colors.black, width: 2),
              borderRadius: BorderRadius.circular(8),
            ),
            child: const Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.sort, size: 16, color: LunasTheme.coralRed),
                SizedBox(width: 8),
                Text(
                  'Sorted by: Highest Interest First (Avalanche Method)',
                  style: TextStyle(
                    color: LunasTheme.coralRed,
                    fontWeight: FontWeight.w800,
                    fontSize: 11,
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),

          // List of debts
          if (sortedDebts.isEmpty)
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: Colors.black, width: 2.5),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Column(
                children: [
                  Icon(Icons.sentiment_very_satisfied, size: 48, color: LunasTheme.emeraldGreen),
                  SizedBox(height: 12),
                  Text(
                    'Luar biasa! Anda bebas dari segala utang.',
                    style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: LunasTheme.emeraldGreen),
                  ),
                ],
              ),
            )
          else
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: sortedDebts.length,
              itemBuilder: (context, index) {
                final debt = sortedDebts[index];
                final isPriority = index == 0; // Highest interest is priority in Avalanche
                
                return GestureDetector(
                  onTap: isPriority ? () => _showBiometricPaySheet(context, debt, state) : null,
                  child: Container(
                    margin: const EdgeInsets.only(bottom: 16),
                    padding: const EdgeInsets.all(20),
                    decoration: BoxDecoration(
                      color: isPriority ? const Color(0xFFFFECEB) : Colors.white,
                      border: Border.all(
                        color: isPriority ? LunasTheme.coralRed : Colors.black,
                        width: isPriority ? 3.5 : 2.5,
                      ),
                      borderRadius: BorderRadius.circular(16),
                      boxShadow: isPriority ? LunasTheme.neoShadowSmall : null,
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              debt.name,
                              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 18),
                            ),
                            if (isPriority)
                              Container(
                                padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                                decoration: BoxDecoration(
                                  color: LunasTheme.coralRed,
                                  border: Border.all(color: Colors.black, width: 1.5),
                                  borderRadius: BorderRadius.circular(20),
                                ),
                                child: const Text(
                                  'PRIORITY #1',
                                  style: TextStyle(
                                    color: Colors.white,
                                    fontWeight: FontWeight.w900,
                                    fontSize: 9,
                                  ),
                                ),
                              ),
                          ],
                        ),
                        const SizedBox(height: 6),
                        Row(
                          children: [
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: LunasTheme.coralRed.withAlpha(26),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                '${(debt.interestRateAPR * 100).toStringAsFixed(0)}% APR',
                                style: const TextStyle(
                                  color: LunasTheme.coralRed,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 12,
                                ),
                              ),
                            ),
                            const SizedBox(width: 8),
                            if (isPriority)
                              Text(
                                'Tap to Pay down surplus',
                                style: TextStyle(
                                  color: Colors.grey[600],
                                  fontSize: 11,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                          ],
                        ),
                        const Divider(height: 24, thickness: 1.5, color: Colors.black12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Outstanding',
                              style: TextStyle(fontSize: 12, color: Colors.grey[700], fontWeight: FontWeight.bold),
                            ),
                            Text(
                              'Rp ${debt.amount.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                              style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 16),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                );
              },
            ),
        ],
      ),
    );
  }
}
