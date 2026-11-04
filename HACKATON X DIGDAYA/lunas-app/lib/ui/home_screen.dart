import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/state/lunas_provider.dart';
import '../data/models/user_profile.dart';
import '../theme/lunas_theme.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  bool _isSweeping = false;

  void _triggerSweep(LunasProvider provider) async {
    setState(() {
      _isSweeping = true;
    });

    // Simulate 1.2s Open Banking authorization check
    await Future.delayed(const Duration(milliseconds: 1200));

    if (mounted) {
      provider.sweepDebt(800000.0);
      setState(() {
        _isSweeping = false;
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
                    'Sweep Berhasil! Rp 800.000 dibayarkan ke Kredivo via SNAP BI.',
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

    if (state.isLoading) {
      return const SizedBox.shrink(); // MainScaffold already handles loading screen overlay
    }

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 24.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Greeting & Profile Indicator
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Morning, Nabil',
                    style: Theme.of(context).textTheme.displayMedium?.copyWith(
                          fontSize: 28,
                          height: 1.1,
                        ),
                  ),
                  const SizedBox(height: 4),
                  Row(
                    children: [
                      Container(
                        width: 8,
                        height: 8,
                        decoration: const BoxDecoration(
                          color: LunasTheme.emeraldGreen,
                          shape: BoxShape.circle,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Text(
                        'SNAP BI Live Open Banking',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ],
              ),
              // User Avatar
              Container(
                width: 48,
                height: 48,
                decoration: BoxDecoration(
                  color: const Color(0xFFFFDE6A), // Bright brutalist yellow
                  shape: BoxShape.circle,
                  border: Border.all(color: Colors.black, width: 2.5),
                  boxShadow: const [
                    BoxShadow(
                      color: Colors.black,
                      offset: Offset(2, 2),
                      blurRadius: 0,
                    )
                  ],
                ),
                child: const Center(
                  child: Text(
                    'N',
                    style: TextStyle(
                      fontWeight: FontWeight.w900,
                      fontSize: 20,
                      color: Colors.black,
                    ),
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),

          // Universal Net Worth Card
          _buildNetWorthCard(state),
          const SizedBox(height: 28),

          // Dynamic layout based on UserProfile state
          _buildDynamicSection(state),
        ],
      ),
    );
  }

  Widget _buildNetWorthCard(LunasProvider state) {
    final isNegative = state.netWorth < 0;
    final absNetWorth = state.netWorth.abs();
    final formattedNetWorth = 'Rp ${absNetWorth.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}';

    return Container(
      width: double.infinity,
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black, width: 3.0),
        borderRadius: BorderRadius.circular(16),
        boxShadow: LunasTheme.neoShadow,
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Top Header Header of the card
          Container(
            width: double.infinity,
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
            decoration: const BoxDecoration(
              border: Border(
                bottom: BorderSide(color: Colors.black, width: 3.0),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Text(
                  'NET WORTH ESTIMATE',
                  style: TextStyle(
                    fontWeight: FontWeight.w800,
                    fontSize: 12,
                    letterSpacing: 1.0,
                    color: Colors.black54,
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                  decoration: BoxDecoration(
                    color: isNegative ? LunasTheme.coralRed : LunasTheme.emeraldGreen,
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Text(
                    isNegative ? 'NET DEBT' : 'NET SURPLUS',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                    ),
                  ),
                ),
              ],
            ),
          ),
          // Net Worth Number Area
          Padding(
            padding: const EdgeInsets.all(20),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  isNegative ? '-$formattedNetWorth' : formattedNetWorth,
                  style: TextStyle(
                    fontSize: 34,
                    fontWeight: FontWeight.w900,
                    color: isNegative ? LunasTheme.coralRed : LunasTheme.emeraldGreen,
                    letterSpacing: -0.5,
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  isNegative
                      ? 'AI Action plan active: Avalanche Payoff prioritisation.'
                      : 'Accumulating asset yields inside money markets.',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Colors.grey[600],
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildDynamicSection(LunasProvider state) {
    switch (state.currentProfile) {
      case UserProfile.gigWorker:
        return _buildGigWorkerLayout(state);
      case UserProfile.debtFocused:
        return _buildDebtFocusedLayout(state);
      case UserProfile.wealthFocused:
        return _buildWealthFocusedLayout(state);
    }
  }

  // 1. GigWorker View: Volatility, Cashflow runway buffer
  Widget _buildGigWorkerLayout(LunasProvider state) {
    // Math logic for cashflow buffer bar
    final buffer = state.dynamicBuffer > 0 ? state.dynamicBuffer : 1500000.0;
    final currentCash = state.availableCash;
    final progress = (currentCash / buffer).clamp(0.0, 1.0);
    final surplus = (currentCash - buffer).clamp(0.0, double.infinity);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // Title banner
        Text(
          'SURVIVING PROFILE (FREELANCE/GIG)',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w800,
                color: LunasTheme.primaryIndigo,
              ),
        ),
        const SizedBox(height: 12),

        // Cashflow vs Buffer Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: Colors.black, width: 3.0),
            borderRadius: BorderRadius.circular(16),
            boxShadow: LunasTheme.neoShadow,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Runway Cash vs Buffer',
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                  ),
                  Icon(Icons.shield_outlined, color: LunasTheme.primaryIndigo),
                ],
              ),
              const SizedBox(height: 16),
              // Brutalist Progress Bar
              Container(
                width: double.infinity,
                height: 24,
                decoration: BoxDecoration(
                  color: Colors.grey[200],
                  border: Border.all(color: Colors.black, width: 2.5),
                  borderRadius: BorderRadius.circular(6),
                ),
                child: FractionallySizedBox(
                  alignment: Alignment.centerLeft,
                  widthFactor: progress,
                  child: Container(
                    decoration: BoxDecoration(
                      color: progress >= 1.0 ? LunasTheme.emeraldGreen : LunasTheme.coralRed,
                      borderRadius: BorderRadius.circular(3),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 12),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'Saldo: Rp ${currentCash.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                    style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
                  ),
                  Text(
                    'Buffer Aman: Rp ${buffer.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                    style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 12),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Safe-to-spend Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: const Color(0xFFE2E8F0), // Cool slate Brutalism
            border: Border.all(color: Colors.black, width: 3.0),
            borderRadius: BorderRadius.circular(16),
            boxShadow: LunasTheme.neoShadow,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'SAFE-TO-SPEND TODAY',
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  fontSize: 12,
                  letterSpacing: 1.0,
                  color: Colors.black54,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                surplus > 0
                    ? 'Rp ${surplus.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}'
                    : 'Rp 0',
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  color: Colors.black,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                surplus > 0
                    ? 'Anda memiliki dana berlebih di atas batas aman kas harian yang dapat dibelanjakan hari ini.'
                    : 'Peringatan: Saldo pas-pasan. Jarvis menyarankan penghematan agar cash runway tetap aman.',
                style: const TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                  height: 1.3,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  // 2. DebtFocused View: Countdown, Sweep suggestions
  Widget _buildDebtFocusedLayout(LunasProvider state) {
    final highestAPR = state.debts.isNotEmpty ? state.debts.first : null;
    final cashSurplus = (state.availableCash - state.dynamicBuffer).clamp(0.0, double.infinity);
    final hasSurplusToSweep = cashSurplus >= 800000.0 && highestAPR != null && highestAPR.amount > 0;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'RECOVERING PROFILE (DEBT AVALANCHE)',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w800,
                color: LunasTheme.primaryIndigo,
              ),
        ),
        const SizedBox(height: 12),

        // Countdown Box
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: Colors.black, width: 3.0),
            borderRadius: BorderRadius.circular(16),
            boxShadow: LunasTheme.neoShadow,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'DEBT-FREE COUNTDOWN (EST.)',
                style: TextStyle(
                  fontWeight: FontWeight.w800,
                  fontSize: 12,
                  color: Colors.black54,
                  letterSpacing: 1.0,
                ),
              ),
              const SizedBox(height: 8),
              Row(
                children: [
                  const Icon(Icons.timer, color: LunasTheme.coralRed, size: 32),
                  const SizedBox(width: 12),
                  Text(
                    state.debts.isEmpty ? '0 Months 0 Days' : '4 Months 12 Days',
                    style: const TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                      color: LunasTheme.coralRed,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Action Sweep Card
        if (highestAPR != null) ...[
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: const Color(0xFFFFECEB), // Soft brutalist red background
              border: Border.all(color: Colors.black, width: 3.0),
              borderRadius: BorderRadius.circular(16),
              boxShadow: LunasTheme.neoShadow,
            ),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(
                        color: LunasTheme.coralRed,
                        border: Border.all(color: Colors.black, width: 1.5),
                        borderRadius: BorderRadius.circular(20),
                      ),
                      child: const Text(
                        'ACTION REQUIRED',
                        style: TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w900,
                          fontSize: 9,
                        ),
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 12),
                const Text(
                  'Dana Berlebih Terdeteksi!',
                  style: TextStyle(fontWeight: FontWeight.w900, fontSize: 18, color: LunasTheme.neoBlack),
                ),
                const SizedBox(height: 6),
                const Text(
                  'Anda memiliki saldo Rp 800.000 di atas batas aman harian. Jarvis menyarankan melunasi utang dengan bunga tertinggi sekarang:',
                  style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: Colors.black87, height: 1.4),
                ),
                const SizedBox(height: 16),
                Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: Colors.white,
                    border: Border.all(color: Colors.black, width: 2.0),
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            highestAPR.name,
                            style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
                          ),
                          Text(
                            'Suku Bunga: ${(highestAPR.interestRateAPR * 100).toStringAsFixed(0)}% APR',
                            style: const TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: LunasTheme.coralRed),
                          ),
                        ],
                      ),
                      Text(
                        'Rp ${highestAPR.amount.toStringAsFixed(0).replaceAllMapped(RegExp(r'(\d{1,3})(?=(\d{3})+(?!\d))'), (Match m) => '${m[1]}.')}',
                        style: const TextStyle(fontWeight: FontWeight.w900, fontSize: 14),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: hasSurplusToSweep && !_isSweeping ? () => _triggerSweep(state) : null,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: LunasTheme.coralRed,
                      foregroundColor: Colors.white,
                      disabledBackgroundColor: Colors.grey[350],
                    ),
                    child: _isSweeping
                        ? const SizedBox(
                            width: 20,
                            height: 20,
                            child: CircularProgressIndicator(color: Colors.white, strokeWidth: 3),
                          )
                        : const Text('1-TAP APPROVE SWEEP (Rp 800.000)'),
                  ),
                ),
              ],
            ),
          ),
        ] else ...[
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border.all(color: Colors.black, width: 3.0),
              borderRadius: BorderRadius.circular(16),
              boxShadow: LunasTheme.neoShadow,
            ),
            child: const Center(
              child: Text(
                'Selamat! Semua utang Anda telah Lunas.',
                style: TextStyle(fontWeight: FontWeight.bold, fontSize: 14, color: LunasTheme.emeraldGreen),
              ),
            ),
          )
        ],
      ],
    );
  }

  // 3. WealthFocused View: Investment growth CustomPainter, auto-sweep
  Widget _buildWealthFocusedLayout(LunasProvider state) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'EXPANDING PROFILE (WEALTH INVESTOR)',
          style: Theme.of(context).textTheme.titleLarge?.copyWith(
                fontSize: 14,
                fontWeight: FontWeight.w800,
                color: LunasTheme.primaryIndigo,
              ),
        ),
        const SizedBox(height: 12),

        // Investment Growth Card (CustomPainter)
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: Colors.black, width: 3.0),
            borderRadius: BorderRadius.circular(16),
            boxShadow: LunasTheme.neoShadow,
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    'RDPU Yield Curve',
                    style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                  ),
                  Text(
                    '+5.82% p.a.',
                    style: TextStyle(color: LunasTheme.emeraldGreen, fontWeight: FontWeight.w900, fontSize: 14),
                  ),
                ],
              ),
              const SizedBox(height: 16),
              // Custom Painter Line Chart
              Container(
                width: double.infinity,
                height: 130,
                decoration: BoxDecoration(
                  color: const Color(0xFFF9FAFB),
                  border: Border.all(color: Colors.black, width: 2.0),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: CustomPaint(
                  painter: GrowthChartPainter(),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 20),

        // Auto Sweep Toggle Card
        Container(
          width: double.infinity,
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white,
            border: Border.all(color: Colors.black, width: 3.0),
            borderRadius: BorderRadius.circular(16),
            boxShadow: LunasTheme.neoShadow,
          ),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text(
                      'Auto-Sweep to RDPU',
                      style: TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      'Secara otonom menginvestasikan sisa kas di atas buffer harian setiap malam ke RDPU.',
                      style: TextStyle(fontSize: 11, color: Colors.grey[700], fontWeight: FontWeight.bold, height: 1.3),
                    ),
                  ],
                ),
              ),
              const SizedBox(width: 16),
              Switch(
                value: state.isAutoSweepEnabled,
                onChanged: (val) => state.toggleAutoSweep(val),
                activeThumbColor: LunasTheme.primaryIndigo,
                activeTrackColor: LunasTheme.primaryIndigo.withAlpha(51),
                inactiveThumbColor: Colors.white,
                inactiveTrackColor: Colors.grey[300],
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// Custom Painter to draw a clean high-contrast Neo-Brutalism growth chart.
class GrowthChartPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = Colors.black12
      ..strokeWidth = 1.0;

    // Draw Grid Lines
    const horizontalLines = 4;
    const verticalLines = 6;
    for (int i = 1; i < horizontalLines; i++) {
      final y = size.height / horizontalLines * i;
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
    for (int i = 1; i < verticalLines; i++) {
      final x = size.width / verticalLines * i;
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }

    // Chart Line Path
    final points = [
      Offset(0, size.height * 0.8),
      Offset(size.width * 0.15, size.height * 0.72),
      Offset(size.width * 0.3, size.height * 0.75),
      Offset(size.width * 0.45, size.height * 0.60),
      Offset(size.width * 0.6, size.height * 0.52),
      Offset(size.width * 0.75, size.height * 0.35),
      Offset(size.width * 0.9, size.height * 0.38),
      Offset(size.width, size.height * 0.15),
    ];

    // Shadow Path
    final shadowPath = Path()
      ..moveTo(points.first.dx, size.height)
      ..lineTo(points.first.dx, points.first.dy);
    for (int i = 1; i < points.length; i++) {
      shadowPath.lineTo(points[i].dx, points[i].dy);
    }
    shadowPath
      ..lineTo(size.width, size.height)
      ..close();

    final shadowPaint = Paint()
      ..color = LunasTheme.emeraldGreen.withAlpha(30)
      ..style = PaintingStyle.fill;
    canvas.drawPath(shadowPath, shadowPaint);

    // Thick Black Path underneath green path for pop-art aesthetic
    final pathBlack = Path()..moveTo(points.first.dx, points.first.dy + 3.0);
    for (int i = 1; i < points.length; i++) {
      pathBlack.lineTo(points[i].dx, points[i].dy + 3.0);
    }
    final blackLinePaint = Paint()
      ..color = Colors.black
      ..strokeWidth = 3.5
      ..style = PaintingStyle.stroke;
    canvas.drawPath(pathBlack, blackLinePaint);

    // Main Green Line Path
    final pathGreen = Path()..moveTo(points.first.dx, points.first.dy);
    for (int i = 1; i < points.length; i++) {
      pathGreen.lineTo(points[i].dx, points[i].dy);
    }

    final greenLinePaint = Paint()
      ..color = LunasTheme.emeraldGreen
      ..strokeWidth = 3.5
      ..style = PaintingStyle.stroke;
    canvas.drawPath(pathGreen, greenLinePaint);

    // Draw End Circle Point
    final circlePaint = Paint()
      ..color = Colors.white
      ..style = PaintingStyle.fill;
    final circleBorderPaint = Paint()
      ..color = Colors.black
      ..strokeWidth = 2.5
      ..style = PaintingStyle.stroke;

    canvas.drawCircle(points.last, 6, circlePaint);
    canvas.drawCircle(points.last, 6, circleBorderPaint);
    canvas.drawCircle(points.last, 2, Paint()..color = LunasTheme.emeraldGreen);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
