import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class LunasTheme {
  static const Color primaryIndigo = Color(0xFF4F46E5);
  static const Color coralRed = Color(0xFFEF4444);
  static const Color emeraldGreen = Color(0xFF10B981);
  static const Color bgOffWhite = Color(0xFFFAF9F6);
  static const Color neoBlack = Color(0xFF111827);
  static const Color neoBorder = Color(0xFF000000);

  // Neo-Brutalism standard border side
  static const BorderSide neoBorderSide = BorderSide(
    color: neoBorder,
    width: 3.0,
  );

  static ThemeData get themeData {
    return ThemeData(
      useMaterial3: true,
      scaffoldBackgroundColor: bgOffWhite,
      colorScheme: const ColorScheme.light(
        primary: primaryIndigo,
        secondary: emeraldGreen,
        error: coralRed,
        surface: bgOffWhite,
        onSurface: neoBlack,
      ),
      fontFamily: GoogleFonts.plusJakartaSans().fontFamily,
      textTheme: GoogleFonts.plusJakartaSansTextTheme(
        ThemeData.light().textTheme,
      ).copyWith(
        displayLarge: GoogleFonts.plusJakartaSans(
          fontSize: 32,
          fontWeight: FontWeight.w800,
          color: neoBlack,
          letterSpacing: -1.0,
        ),
        displayMedium: GoogleFonts.plusJakartaSans(
          fontSize: 24,
          fontWeight: FontWeight.w800,
          color: neoBlack,
          letterSpacing: -0.5,
        ),
        titleLarge: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: neoBlack,
        ),
        bodyLarge: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: neoBlack,
        ),
        bodyMedium: GoogleFonts.plusJakartaSans(
          fontSize: 14,
          fontWeight: FontWeight.normal,
          color: neoBlack,
        ),
      ),
      cardTheme: CardThemeData(
        color: Colors.white,
        elevation: 0,
        shape: RoundedRectangleBorder(
          side: neoBorderSide,
          borderRadius: BorderRadius.circular(12),
        ),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: bgOffWhite,
        elevation: 0,
        centerTitle: false,
        titleTextStyle: TextStyle(
          fontSize: 22,
          fontWeight: FontWeight.w800,
          color: neoBlack,
        ),
        iconTheme: IconThemeData(color: neoBlack),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryIndigo,
          foregroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          textStyle: const TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 16,
          ),
          shape: RoundedRectangleBorder(
            side: neoBorderSide,
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: neoBlack,
          backgroundColor: Colors.white,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 16),
          textStyle: const TextStyle(
            fontWeight: FontWeight.w800,
            fontSize: 16,
          ),
          side: neoBorderSide,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
    );
  }

  // Neo-Brutalism Shadow
  static List<BoxShadow> get neoShadow => [
        const BoxShadow(
          color: neoBorder,
          offset: Offset(4, 4),
          blurRadius: 0,
        ),
      ];

  // Neo shadow for smaller items (e.g. buttons)
  static List<BoxShadow> get neoShadowSmall => [
        const BoxShadow(
          color: neoBorder,
          offset: Offset(2, 2),
          blurRadius: 0,
        ),
      ];
}
