import { useEffect, useState } from 'react';

export default function StaticPage({ page }: { page: string }) {
    const [content, setContent] = useState('');

    useEffect(() => {
        fetch(`/${page}.html`)
            .then((res) => res.text())
            .then((html) => setContent(html))
            .catch(console.error);
    }, [page]);

    return (
        <div
             
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}