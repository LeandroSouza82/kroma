// Converte o desenho estático do próprio site em PNG para copiar ou baixar.
export function imagemModeloPNG(imageUrl) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth || 1200;
        canvas.height = image.naturalHeight || 900;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Conversão de imagem indisponível.");
        context.drawImage(image, 0, 0);
        canvas.toBlob(
          (blob) =>
            blob
              ? resolve(blob)
              : reject(new Error("Não foi possível gerar o PNG.")),
          "image/png",
        );
      } catch (error) {
        reject(error);
      }
    };
    image.onerror = () =>
      reject(new Error("Não foi possível carregar a imagem."));
    image.src = imageUrl;
  });
}

export async function copiarImagemModelo(imageUrl) {
  if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
    throw new Error(
      "Seu navegador não copia imagens. Use Baixar imagem ou Copiar referência.",
    );
  }
  // A escrita começa no clique; o PNG é entregue como promessa ao ClipboardItem.
  await navigator.clipboard.write([
    new ClipboardItem({ "image/png": imagemModeloPNG(imageUrl) }),
  ]);
}

export async function baixarImagemModelo(imageUrl, code) {
  const blob = await imagemModeloPNG(imageUrl);
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = code.toLowerCase() + ".png";
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
