import prisma from "@/db/prisma"
export const GET = async (req, { params }) => {
    if (params.col == "all") {
        try {
            const data = await prisma.SettingSEO.findFirst();
            return new Response(JSON.stringify(data), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }

    const validColumns = ['aims', 'consortium', "taskArea", "coop", "pp", "uc", "tool", "event", "teaching", "link", "blog", "contact", "openPosition", "about", "newPP"]; // Cập nhật danh sách này với các cột hợp lệ.
    const column = params.col;

    if (!validColumns.includes(column)) {
        return new Response(JSON.stringify({ error: "Invalid column name" }), { status: 400 });
    }

    // Tạo một object select động dựa trên cột hợp lệ
    const select = { [column]: true };

    try {
        const data = await prisma.SettingSEO.findFirst({ select });
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        // Trường hợp xảy ra lỗi, trả về lỗi với status code 500
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}