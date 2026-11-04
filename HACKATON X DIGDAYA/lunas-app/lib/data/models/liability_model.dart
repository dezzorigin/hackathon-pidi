class LiabilityModel {
  final String? id;
  final String? userId;
  final String provider;
  final double outstanding;
  final double apr;
  final String status;

  LiabilityModel({
    this.id,
    this.userId,
    required this.provider,
    required this.outstanding,
    required this.apr,
    required this.status,
  });

  /// Factory constructor to create a [LiabilityModel] from a JSON map.
  factory LiabilityModel.fromJson(Map<String, dynamic> json) {
    return LiabilityModel(
      id: json['id'] as String?,
      userId: json['user_id'] as String?,
      provider: json['provider'] as String,
      outstanding: (json['outstanding'] as num).toDouble(),
      apr: (json['apr'] as num).toDouble(),
      status: json['status'] as String,
    );
  }

  /// Converts this [LiabilityModel] to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      if (id != null) 'id': id,
      if (userId != null) 'user_id': userId,
      'provider': provider,
      'outstanding': outstanding,
      'apr': apr,
      'status': status,
    };
  }

  @override
  String toString() {
    return 'LiabilityModel(id: $id, userId: $userId, provider: $provider, outstanding: $outstanding, apr: $apr, status: $status)';
  }
}
