```mermaid
classDiagram
class NotifController
<<abstract>> NotifController
NotifController <-- MessageNotif: Inheritance
NotifController <-- EmailNotif: Inheritance
NotifController <-- InAppNotif: Inheritance


class NotifController{
    -notif_mode: String
    -TransactionDetails: String
    -getTransactionDetails(): String
    -getUserNotifMode(): String
    -sendNotif(): void
}

class MessageNotif{
    - UserNumber: String
    - sendNotif(): void
}

class EmailNotif{
    -UserEmail: String
    -sendNotif(): void
}

class InAppNotif{
    -sendNotif(): void
    -updateStatus(): void
}
```
```Mermaid

sequenceDiagram
    TransactionEnquiryAPI -->> NotifController: TransactionStatus_Updated == True
    activate NotifController
    NotifController -) NotifController:getTransactionDetails()
    deactivate NotifController
    
    activate NotifController
    NotifController -) NotifController:getUserNotifMode()
    NotifController -) User: sendNotif()
    deactivate NotifController


