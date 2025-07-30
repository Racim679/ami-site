import React, { useState, useEffect } from "react";
import { Calculator, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

const MortgageCalculator: React.FC = () => {
  const [propertyPrice, setPropertyPrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(25);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [amortizationTable, setAmortizationTable] = useState<AmortizationRow[]>([]);

  const calculateMortgage = () => {
    const principal = propertyPrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    if (monthlyRate === 0) {
      setMonthlyPayment(principal / numberOfPayments);
      setTotalInterest(0);
      setTotalPayment(principal);
      return;
    }

    const monthlyPaymentAmount = principal *
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    setMonthlyPayment(monthlyPaymentAmount);
    setTotalPayment(monthlyPaymentAmount * numberOfPayments);
    setTotalInterest(monthlyPaymentAmount * numberOfPayments - principal);

    // Générer le tableau d'amortissement (premiers 12 mois)
    const table: AmortizationRow[] = [];
    let remainingBalance = principal;

    for (let month = 1; month <= Math.min(12, numberOfPayments); month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPaymentAmount - interestPayment;
      remainingBalance -= principalPayment;

      table.push({
        month,
        payment: monthlyPaymentAmount,
        principal: principalPayment,
        interest: interestPayment,
        remainingBalance: Math.max(0, remainingBalance)
      });
    }

    setAmortizationTable(table);
  };

  useEffect(() => {
    calculateMortgage();
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-800">Simulateur de Prêt Immobilier</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Formulaire */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prix du bien
            </label>
            <div className="relative">
              <input
                type="number"
                value={propertyPrice}
                onChange={(e) => setPropertyPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="1000"
              />
              <span className="absolute right-3 top-2 text-gray-500">€</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Apport initial
            </label>
            <div className="relative">
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max={propertyPrice}
                step="1000"
              />
              <span className="absolute right-3 top-2 text-gray-500">€</span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {((downPayment / propertyPrice) * 100).toFixed(1)}% du prix du bien
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Taux d'intérêt annuel
            </label>
            <div className="relative">
              <input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                max="20"
                step="0.1"
              />
              <span className="absolute right-3 top-2 text-gray-500">%</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Durée du prêt
            </label>
            <div className="relative">
              <input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="1"
                max="30"
              />
              <span className="absolute right-3 top-2 text-gray-500">ans</span>
            </div>
          </div>
        </div>

        {/* Résultats */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Résultats du calcul</h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <span className="text-gray-700">Mensualité</span>
                </div>
                <span className="text-2xl font-bold text-green-600">
                  {formatCurrency(monthlyPayment)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-red-600" />
                  <span className="text-gray-700">Intérêts totaux</span>
                </div>
                <span className="text-xl font-semibold text-red-600">
                  {formatCurrency(totalInterest)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="text-gray-700">Coût total</span>
                </div>
                <span className="text-xl font-semibold text-blue-600">
                  {formatCurrency(totalPayment)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Montant emprunté</h4>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(propertyPrice - downPayment)}
            </p>
          </div>
        </div>
      </div>

      {/* Tableau d'amortissement */}
      {amortizationTable.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Tableau d'amortissement (12 premiers mois)</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Mois</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Mensualité</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Capital</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Intérêts</th>
                  <th className="border border-gray-300 px-4 py-2 text-right">Capital restant</th>
                </tr>
              </thead>
              <tbody>
                {amortizationTable.map((row) => (
                  <tr key={row.month} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2">{row.month}</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {formatCurrency(row.payment)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {formatCurrency(row.principal)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {formatCurrency(row.interest)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-right">
                      {formatCurrency(row.remainingBalance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator; 