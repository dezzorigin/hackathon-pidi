import 'package:dio/dio.dart';
import '../models/dashboard_model.dart';
import '../models/nudge_response.dart';
import '../models/liability_model.dart';

class LunasApiService {
  final Dio _dio;

  /// Creates a [LunasApiService].
  ///
  /// If no [Dio] client is provided, a default client is initialized with the
  /// base URL set to "http://localhost:8000".
  LunasApiService({Dio? dio})
      : _dio = dio ??
            Dio(
              BaseOptions(
                baseUrl: 'http://localhost:8000',
                connectTimeout: const Duration(seconds: 10),
                receiveTimeout: const Duration(seconds: 10),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                },
              ),
            );

  /// Synchronizes user transaction and liability data via SNAP BI mock simulation.
  ///
  /// Calls `POST /api/snap/sync/{userId}` and returns the list of synchronized liabilities.
  Future<List<LiabilityModel>> syncSnapData(String userId) async {
    try {
      final response = await _dio.post('/api/snap/sync/$userId');
      if (response.data == null || response.data['data'] == null) {
        return [];
      }
      final liabilitiesData = response.data['data']['liabilities'] as List<dynamic>?;
      if (liabilitiesData == null) {
        return [];
      }
      return liabilitiesData
          .map((e) => LiabilityModel.fromJson(e as Map<String, dynamic>))
          .toList();
    } on DioException catch (e) {
      throw _handleDioException(e);
    }
  }

  /// Retrieves the user's dashboard metrics and calculates the proposed Auto-Sweep recommendation.
  ///
  /// Calls `GET /api/engine/dashboard/{userId}`.
  Future<DashboardModel> getDashboard(String userId) async {
    try {
      final response = await _dio.get('/api/engine/dashboard/$userId');
      if (response.data == null) {
        throw Exception('Received null response from dashboard endpoint');
      }
      return DashboardModel.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw _handleDioException(e);
    }
  }

  /// Evaluates an impulsive transaction against the user's active liabilities and returns a Jarvis-like behavioral nudge.
  ///
  /// Calls `POST /api/ai/nudge` with the required parameters in a JSON body.
  Future<NudgeResponse> checkAiNudge({
    required String userId,
    required double amount,
    required String category,
    required String merchant,
  }) async {
    try {
      final response = await _dio.post(
        '/api/ai/nudge',
        data: {
          'user_id': userId,
          'transaction_amount': amount,
          'category': category,
          'merchant': merchant,
        },
      );
      if (response.data == null) {
        throw Exception('Received null response from AI nudge endpoint');
      }
      return NudgeResponse.fromJson(response.data as Map<String, dynamic>);
    } on DioException catch (e) {
      throw _handleDioException(e);
    }
  }

  /// Helper to convert a [DioException] into a standard user-friendly [Exception].
  Exception _handleDioException(DioException error) {
    final statusCode = error.response?.statusCode;
    final message = error.response?.data is Map
        ? (error.response?.data['detail'] ?? error.message)
        : error.message;

    return Exception('LunasApiService Error [$statusCode]: $message');
  }
}
