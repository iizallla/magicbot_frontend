"use client"

import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const notificationsRu = [
  { title: "Новый заказ", message: "Спасибо за ваш заказ :order_id. Мы свяжемся с вами в ближайшее время." },
  { title: "Заказ принят", message: "Ваш заказ :order_id принят и передан в обработку." },
  { title: "Заказ обработан", message: "Мы обработали ваш заказ :order_id." },
  { title: "Заказ собран", message: "Заказ :order_id собран и передан службе доставки." },
  { title: "Заказ доставляется", message: "Курьер с заказом :order_id уже направляется к вам." },
]

const notificationsUz = [
  { title: "Yangi buyurtma", message: "Buyurtmangiz uchun rahmat :order_id. Tez orada siz bilan bog'lanamiz." },
  { title: "Buyurtma qabul qilindi", message: "Buyurtma :order_id qabul qilindi va qayta ishlanmoqda." },
  { title: "Buyurtma bajarildi", message: "Buyurtmangiz :order_id bajarildi." },
  { title: "Buyurtma yig‘ildi", message: "Buyurtma :order_id yig‘ildi va yetkazib berish xizmatiga topshirildi." },
  { title: "Buyurtma yo‘lda", message: "Kuryer :order_id buyurtma bilan sizga yo‘l olgan." },
]

export default function OrderNotificationTabs() {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-xl font-semibold mb-4">Настройки</h2>
      <Tabs defaultValue="ru" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="ru">Шаблоны на русском</TabsTrigger>
          <TabsTrigger value="uz">Шаблоны на узбекском</TabsTrigger>
        </TabsList>

        <TabsContent value="ru">
          <Section title="Push-уведомления о заказе" data={notificationsRu} />
        </TabsContent>
        <TabsContent value="uz">
          <Section title="Buyurtma haqida push xabarnomalar" data={notificationsUz} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function Section({ title, data }) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4 text-center">{title}</h3>
      <div className="space-y-4">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className="w-48 text-right font-medium text-gray-700 pt-2">{item.title}</div>
            <Textarea
              className="bg-gray-50 text-sm flex-1 resize-none"
              defaultValue={item.message}
              rows={2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
