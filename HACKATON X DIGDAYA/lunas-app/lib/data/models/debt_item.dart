class DebtItem {
  final String name;
  final double amount;
  final double interestRateAPR;
  final bool isPriority;

  DebtItem({
    required this.name,
    required this.amount,
    required this.interestRateAPR,
    this.isPriority = false,
  });

  factory DebtItem.fromJson(Map<String, dynamic> json) {
    return DebtItem(
      name: json['name'] as String,
      amount: (json['amount'] as num).toDouble(),
      interestRateAPR: (json['interestRateAPR'] as num).toDouble(),
      isPriority: json['isPriority'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'amount': amount,
      'interestRateAPR': interestRateAPR,
      'isPriority': isPriority,
    };
  }

  @override
  String toString() {
    return 'DebtItem(name: $name, amount: $amount, interestRateAPR: $interestRateAPR, isPriority: $isPriority)';
  }
}
