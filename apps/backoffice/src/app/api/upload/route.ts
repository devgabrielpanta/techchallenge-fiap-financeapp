import { NextRequest, NextResponse } from "next/server";
import { writeFile, unlink } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { fileId, fileName, fileData } = data;

    if (!fileId || !fileName || !fileData) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Remove o prefixo data:application/pdf;base64,
    const base64Data = fileData.replace(/^data:application\/pdf;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    // Caminho para a pasta public/uploads na raiz do projeto
    const uploadsDir = path.join(
      process.cwd(),
      "..",
      "..",
      "public",
      "uploads",
    );
    const filePath = path.join(uploadsDir, `${fileId}.pdf`);

    // Salva o arquivo
    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      fileId,
      fileName,
      filePath: `/uploads/${fileId}.pdf`,
    });
  } catch (error) {
    console.error("Error saving file:", error);
    return NextResponse.json({ error: "Failed to save file" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const { fileId } = data;

    if (!fileId) {
      return NextResponse.json({ error: "Missing fileId" }, { status: 400 });
    }

    // Caminho para a pasta public/uploads na raiz do projeto
    const uploadsDir = path.join(
      process.cwd(),
      "..",
      "..",
      "public",
      "uploads",
    );
    const filePath = path.join(uploadsDir, `${fileId}.pdf`);

    // Deleta o arquivo
    await unlink(filePath);

    return NextResponse.json({
      success: true,
      fileId,
    });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 },
    );
  }
}
