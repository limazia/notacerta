create table invoices (
    id uuid primary key default gen_random_uuid (),
    invoice_number text not null,
    date_of_issue date not null,
    nature_of_transaction text,
    invoice_status text,
    issuing_company text,
    issuing_address text,
    recipient_company text,
    recipient_address text,
    product_sold text,
    product_price numeric,
    discount numeric,
    total_value numeric,
    payment_method text,
    technical_manager text,
    summary_ia text,
    created_at timestamp
    with
        time zone default now()
);

create or replace function delete_old_invoices() 
returns void as $$
begin
  delete from invoices
  where created_at < now() - interval '1 week';
end;
$$ language plpgsql;
