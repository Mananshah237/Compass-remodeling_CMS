import { Card, CardContent } from "@/components/ui/card"
import { getContactMessages } from "@/lib/supabase/rest-api"
import { DeleteMessageButton } from "@/components/admin/delete-message-button"
import { format } from "date-fns"

export default async function AdminMessagesPage() {
  const messages = await getContactMessages()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 className="text-3xl font-bold">Contact Messages</h1>
            <p className="text-muted-foreground mt-1">View and manage messages from your contact form</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {messages && messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((message: any) => (
              <Card key={message.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-lg">{message.name}</h3>
                        <span className="text-sm text-muted-foreground">{message.email}</span>
                        {message.phone && (
                          <span className="text-sm text-muted-foreground">{message.phone}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(new Date(message.created_at), "PPpp")}
                      </p>
                      <p className="text-sm mt-4 whitespace-pre-wrap">{message.message}</p>
                    </div>
                    <DeleteMessageButton id={message.id} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No messages yet</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

