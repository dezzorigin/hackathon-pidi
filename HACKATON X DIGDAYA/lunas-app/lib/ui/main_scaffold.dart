import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../data/state/lunas_provider.dart';
import '../theme/lunas_theme.dart';
import 'home_screen.dart';
import 'debt_screen.dart';
import 'jarvis_screen.dart';
import 'profile_screen.dart';

class MainScaffold extends StatefulWidget {
  const MainScaffold({super.key});

  @override
  State<MainScaffold> createState() => _MainScaffoldState();
}

class _MainScaffoldState extends State<MainScaffold> {
  int _currentIndex = 0;

  final List<String> _titles = [
    'LUNAS Home',
    'Debt Avalanche',
    'Jarvis AI CFO',
    'Wealth Expander',
    'My CFO Profile',
  ];

  Widget _buildTabContent(int index, LunasProvider state) {
    if (state.isLoading) {
      return Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              padding: const EdgeInsets.all(24),
              decoration: BoxDecoration(
                color: Colors.white,
                border: Border.all(color: Colors.black, width: 3.0),
                boxShadow: LunasTheme.neoShadow,
                borderRadius: BorderRadius.circular(16),
              ),
              child: const CircularProgressIndicator(
                valueColor: AlwaysStoppedAnimation<Color>(LunasTheme.primaryIndigo),
                strokeWidth: 4,
              ),
            ),
            const SizedBox(height: 24),
            Text(
              'Simulating Open Banking (SNAP BI) Sync...',
              style: Theme.of(context).textTheme.bodyLarge?.copyWith(
                fontWeight: FontWeight.w800,
              ),
            ),
          ],
        ),
      );
    }

    switch (index) {
      case 0:
        return const HomeScreen();
      case 1:
        return const DebtScreen();
      case 2:
        return const JarvisScreen();
      case 3:
        return _buildWealthTab(state);
      case 4:
        return const ProfileScreen();
      default:
        return const SizedBox.shrink();
    }
  }

  Widget _buildWealthTab(LunasProvider state) {
    return Center(
      child: Text(
        'Wealth Expander (RDPU/Investments)\nActive Assets: ${state.assets.length}',
        textAlign: TextAlign.center,
        style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 18),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final state = Provider.of<LunasProvider>(context);

    return Scaffold(
      appBar: AppBar(
        title: Text(_titles[_currentIndex]),
        bottom: PreferredSize(
          preferredSize: const Size.fromHeight(3),
          child: Container(color: Colors.black, height: 3),
        ),
      ),
      body: _buildTabContent(_currentIndex, state),
      bottomNavigationBar: Container(
        height: 85,
        decoration: const BoxDecoration(
          color: Colors.white,
          border: Border(
            top: BorderSide(color: Colors.black, width: 3),
          ),
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceAround,
          children: [
            _buildNavItem(0, Icons.home_filled, 'Home'),
            _buildNavItem(1, Icons.money_off, 'Debt'),
            _buildJarvisNavItem(),
            _buildNavItem(3, Icons.trending_up, 'Wealth'),
            _buildNavItem(4, Icons.person, 'Profile'),
          ],
        ),
      ),
    );
  }

  Widget _buildNavItem(int index, IconData icon, String label) {
    final isSelected = _currentIndex == index;
    return GestureDetector(
      onTap: () => setState(() => _currentIndex = index),
      behavior: HitTestBehavior.opaque,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            color: isSelected ? LunasTheme.primaryIndigo : Colors.black54,
            size: 26,
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: TextStyle(
              fontSize: 12,
              fontWeight: isSelected ? FontWeight.w800 : FontWeight.bold,
              color: isSelected ? LunasTheme.primaryIndigo : Colors.black54,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildJarvisNavItem() {
    final isSelected = _currentIndex == 2;
    return GestureDetector(
      onTap: () => setState(() => _currentIndex = 2),
      child: Transform.translate(
        offset: const Offset(0, -10),
        child: Container(
          width: 58,
          height: 58,
          decoration: BoxDecoration(
            color: isSelected ? LunasTheme.primaryIndigo : Colors.white,
            shape: BoxShape.circle,
            border: Border.all(color: Colors.black, width: 3),
            boxShadow: const [
              BoxShadow(
                color: Colors.black,
                offset: Offset(2, 2),
                blurRadius: 0,
              )
            ],
          ),
          child: Icon(
            Icons.bolt,
            color: isSelected ? Colors.white : LunasTheme.primaryIndigo,
            size: 32,
          ),
        ),
      ),
    );
  }
}
