import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'data/services/mock_api_service.dart';
import 'data/state/lunas_provider.dart';
import 'theme/lunas_theme.dart';
import 'ui/main_scaffold.dart';
import 'ui/onboarding_screen.dart';

void main() {
  runApp(
    MultiProvider(
      providers: [
        Provider<MockApiService>(
          create: (_) => MockApiService(),
        ),
        ChangeNotifierProvider<LunasProvider>(
          create: (context) => LunasProvider(
            apiService: context.read<MockApiService>(),
          ),
        ),
      ],
      child: const LunasApp(),
    ),
  );
}

class LunasApp extends StatelessWidget {
  const LunasApp({super.key});

  @override
  Widget build(BuildContext context) {
    final provider = Provider.of<LunasProvider>(context);

    return MaterialApp(
      title: 'LUNAS',
      debugShowCheckedModeBanner: false,
      theme: LunasTheme.themeData,
      home: provider.isOnboardingCompleted
          ? const MainScaffold()
          : const OnboardingScreen(),
    );
  }
}
