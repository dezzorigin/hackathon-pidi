class RecommendedSweepModel {
  final String liabilityId;
  final String provider;
  final double apr;
  final double sweepAmount;

  RecommendedSweepModel({
    required this.liabilityId,
    required this.provider,
    required this.apr,
    required this.sweepAmount,
  });

  /// Factory constructor to create a [RecommendedSweepModel] from a JSON map.
  factory RecommendedSweepModel.fromJson(Map<String, dynamic> json) {
    return RecommendedSweepModel(
      liabilityId: json['liability_id'] as String,
      provider: json['provider'] as String,
      apr: (json['apr'] as num).toDouble(),
      sweepAmount: (json['sweep_amount'] as num).toDouble(),
    );
  }

  /// Converts this [RecommendedSweepModel] to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'liability_id': liabilityId,
      'provider': provider,
      'apr': apr,
      'sweep_amount': sweepAmount,
    };
  }

  @override
  String toString() {
    return 'RecommendedSweepModel(liabilityId: $liabilityId, provider: $provider, apr: $apr, sweepAmount: $sweepAmount)';
  }
}

class DashboardModel {
  final double netWorth;
  final double totalAssets;
  final double totalLiabilities;
  final double dynamicBuffer;
  final double surplus;
  final RecommendedSweepModel? recommendedSweep;

  DashboardModel({
    required this.netWorth,
    required this.totalAssets,
    required this.totalLiabilities,
    required this.dynamicBuffer,
    required this.surplus,
    this.recommendedSweep,
  });

  /// Factory constructor to create a [DashboardModel] from a JSON map.
  factory DashboardModel.fromJson(Map<String, dynamic> json) {
    return DashboardModel(
      netWorth: (json['net_worth'] as num).toDouble(),
      totalAssets: (json['total_assets'] as num).toDouble(),
      totalLiabilities: (json['total_liabilities'] as num).toDouble(),
      dynamicBuffer: (json['dynamic_buffer'] as num).toDouble(),
      surplus: (json['surplus'] as num).toDouble(),
      recommendedSweep: json['recommended_sweep'] != null
          ? RecommendedSweepModel.fromJson(json['recommended_sweep'] as Map<String, dynamic>)
          : null,
    );
  }

  /// Converts this [DashboardModel] to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'net_worth': netWorth,
      'total_assets': totalAssets,
      'total_liabilities': totalLiabilities,
      'dynamic_buffer': dynamicBuffer,
      'surplus': surplus,
      'recommended_sweep': recommendedSweep?.toJson(),
    };
  }

  @override
  String toString() {
    return 'DashboardModel(netWorth: $netWorth, totalAssets: $totalAssets, totalLiabilities: $totalLiabilities, dynamicBuffer: $dynamicBuffer, surplus: $surplus, recommendedSweep: $recommendedSweep)';
  }
}
