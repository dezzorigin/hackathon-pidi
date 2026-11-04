class NudgeResponse {
  final String nudgeMessage;
  final int delayedDays;
  final String ragContextUsed;

  NudgeResponse({
    required this.nudgeMessage,
    required this.delayedDays,
    required this.ragContextUsed,
  });

  /// Factory constructor to create a [NudgeResponse] from a JSON map.
  factory NudgeResponse.fromJson(Map<String, dynamic> json) {
    return NudgeResponse(
      nudgeMessage: json['nudge_message'] as String,
      delayedDays: json['delayed_days'] as int,
      ragContextUsed: json['rag_context_used'] as String,
    );
  }

  /// Converts this [NudgeResponse] to a JSON map.
  Map<String, dynamic> toJson() {
    return {
      'nudge_message': nudgeMessage,
      'delayed_days': delayedDays,
      'rag_context_used': ragContextUsed,
    };
  }

  @override
  String toString() {
    return 'NudgeResponse(nudgeMessage: $nudgeMessage, delayedDays: $delayedDays, ragContextUsed: $ragContextUsed)';
  }
}
