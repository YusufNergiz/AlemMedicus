import { FieldValue, serverTimestamp } from "firebase/firestore";

export interface News {
    content: string;
    imageUrls: string;
    newsId: string;
    title: string;
    date: typeof serverTimestamp | FieldValue | Date;
}
