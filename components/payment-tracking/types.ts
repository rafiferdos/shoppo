export interface Payment {
    id: string
    serial: string
    customer: {
        name: string
        phone: string
    }
    product: {
        name: string
        price: string
        notes: string
    }
    upfront: {
        amount: string
        status: "Paid" | "Pending" | "Overdue"
        paidDate?: string
    }
    final: {
        amount: string
        status: "Paid" | "Pending" | "Overdue"
        dueDate: string
    }
    totalAmount: string
    dueDate: string
}
