class AssetItem {
  final String name;
  final double amount;

  AssetItem({
    required this.name,
    required this.amount,
  });

  factory AssetItem.fromJson(Map<String, dynamic> json) {
    return AssetItem(
      name: json['name'] as String,
      amount: (json['amount'] as num).toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'name': name,
      'amount': amount,
    };
  }

  @override
  String toString() {
    return 'AssetItem(name: $name, amount: $amount)';
  }
}
