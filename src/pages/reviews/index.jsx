import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const Reviews = () => {
    const reviews = [
        {
            id: "INV002",
            name: "Zilola",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9w",
        },
        {
            id: "INV003",
            name: "Alisher",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9w",
        },
        {
            id: "INV004",
            name: "Munisa",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
        {
            id: "INV005",
            name: "Sharif",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
        {
            id: "INV006",
            name: "Aziz",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
        {
            id: "INV007",
            name: "Afruzbek",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
        {
            id: "INV008",
            name: "Ibrohim",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
        {
            id: "INV009",
            name: "Hilola",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
        {
            id: "INV010",
            name: "Laziza",
            comment:
                "Mahsulot juda tez yetkazildi. Tashqi ko'rinishi ham chiroyli. Juda mamnun bo'ldim! ifiewmiwdmicmwimciwcmwivirwijvrwijjiwnvivnw39vjr9fevimeomv93vm9wjjitj4tj4iji4jgit4ji",
        },
    ];

    const [expanded, setExpanded] = useState("");
    const toggleExpand = (id) => {

        setExpanded(id);
    };

    return (
        <div>
            <div className="m-6 mb-12 text-xl font-semibold">Boshqaruv Paneli</div>
            <Table className>
                <TableCaption>Yaqinda yozilgan sharhlaringiz.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead >ID</TableHead>
                        <TableHead >Ism</TableHead>
                        <TableHead>Sharh</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {reviews.map((review) => (
                        <TableRow key={review.id}>
                            <TableCell className="font-medium">{review.id}</TableCell>
                            <TableCell>{review.name}</TableCell>
                            <TableCell>
                                    <p
                                     onClick={() => toggleExpand(review.id)}
                                    className={`${expanded === review.id ? "" : "line-clamp-1 !overflow-hidden  w-[250px]"} `}>
                                        {review.comment}
                                    </p>
                                <div>
                                <button
                                    onClick={() => toggleExpand(null)}
                                    className="text-blue-600 mt-2"
                                    >
                                    {expanded === review.id ? "Yashirish" : ""}
                                </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default Reviews;
