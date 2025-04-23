export interface Invoice {
  id: string;
  invoice_number: string;
  date_of_issue: string;
  nature_of_transaction: string;
  invoice_status: string;
  issuing_company: string;
  issuing_address: string;
  recipient_company: string;
  recipient_address: string;
  product_sold: string;
  product_price: number;
  discount: number;
  total_value: number;
  payment_method: string;
  technical_manager: string;
  summary_ia: string;
  created_at: string;
}
