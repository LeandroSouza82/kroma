import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { MODELOS_SITE } from "../src/data/siteModels.js";

const output = fileURLToPath(new URL("../public/modelos/", import.meta.url));
await mkdir(output, { recursive: true });
const esc = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");

for (const model of MODELOS_SITE) {
  const shapes = [];
  const rect = (x, y, w, h, fill, rx = 0, stroke = "none") =>
    shapes.push(
      '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        w +
        '" height="' +
        h +
        '" rx="' +
        rx +
        '" fill="' +
        fill +
        '" stroke="' +
        stroke +
        '"/>',
    );
  const text = (
    x,
    y,
    value,
    size = 24,
    fill = "#1b2940",
    weight = 400,
    anchor = "start",
  ) =>
    shapes.push(
      '<text x="' +
        x +
        '" y="' +
        y +
        '" font-family="Arial, sans-serif" font-size="' +
        size +
        '" font-weight="' +
        weight +
        '" fill="' +
        fill +
        '" text-anchor="' +
        anchor +
        '">' +
        esc(value) +
        "</text>",
    );
  const line = (x, y, w, fill = "#d6dfec") => rect(x, y, w, 5, fill, 2);
  const button = (x, y, label, w = 200, fill = model.accent) => {
    rect(x, y, w, 46, fill, 10);
    text(x + w / 2, y + 29, label, 18, "#ffffff", 600, "middle");
  };
  const photo = (x, y, w, h, dark = false) => {
    const base = dark ? "#243b55" : "#e4ebf3";
    const ink = dark ? "#496f97" : "#aec3dc";
    rect(x, y, w, h, base, 14);
    shapes.push(
      '<circle cx="' +
        (x + w * 0.72) +
        '" cy="' +
        (y + h * 0.26) +
        '" r="' +
        h * 0.095 +
        '" fill="' +
        ink +
        '"/>',
    );
    shapes.push(
      '<path d="M ' +
        (x + w * 0.08) +
        " " +
        (y + h * 0.7) +
        " L " +
        (x + w * 0.34) +
        " " +
        (y + h * 0.34) +
        " L " +
        (x + w * 0.57) +
        " " +
        (y + h * 0.64) +
        " L " +
        (x + w * 0.7) +
        " " +
        (y + h * 0.49) +
        " L " +
        (x + w * 0.91) +
        " " +
        (y + h * 0.7) +
        ' Z" fill="' +
        ink +
        '"/>',
    );
    text(
      x + w / 2,
      y + h * 0.89,
      "Sua imagem aqui",
      17,
      dark ? "#c1d6ec" : "#5d728c",
      400,
      "middle",
    );
  };
  const brand = (x, y, dark = false) => {
    rect(x, y - 25, 29, 29, model.accent, 7);
    text(x + 42, y, "Sua marca", 28, dark ? "#ffffff" : "#17263d", 700);
  };
  const nav = (y, dark = false, start = 620) => {
    ["Início", "Sobre", "Serviços", "Contato"].forEach((label, i) =>
      text(start + i * 119, y, label, 20, dark ? "#c8d5e8" : "#63728a", 500),
    );
  };
  const card = (x, y, w, title, h = 143) => {
    rect(x, y, w, h, "#ffffff", 14, "#dfe5ee");
    rect(x + 20, y + 20, 31, 31, model.accent, 9);
    text(x + 20, y + (h < 117 ? 70 : 81), title, 25, "#24334c", 600);
    line(x + 20, y + (h < 117 ? 89 : 102), w - 55);
    if (h > 148) line(x + 20, y + 126, w - 100);
  };
  const contact = (x, y, w, label = "Vamos conversar?") => {
    rect(x, y, w, 75, "#edf1f7", 12);
    text(x + 23, y + 46, label, 27, "#26354c", 600);
    button(x + w - 231, y + 15, "Fale pelo WhatsApp", 208);
  };

  rect(0, 0, 1200, 900, "#eaf0f7");
  text(42, 49, model.code + " / " + model.label, 25, "#22344f", 600);
  text(1158, 47, "KROMA WEB · BASE VISUAL", 15, "#59718e", 600, "end");
  rect(40, 80, 1120, 725, "#ffffff", 20, "#ced8e6");
  rect(40, 80, 1120, 29, "#dce5f0", 17);
  [62, 76, 90].forEach((x) =>
    shapes.push('<circle cx="' + x + '" cy="95" r="4" fill="#9cacbf"/>'),
  );
  text(600, 100, "sua marca · seu endereço", 12, "#687b96", 400, "middle");

  switch (model.id) {
    case "kw-01":
      brand(94, 155);
      nav(153);
      rect(64, 180, 1072, 362, "#152843", 15);
      text(100, 245, "FEITO PARA O SEU NEGÓCIO", 17, "#a5c6ff", 600);
      text(100, 326, "Seu negócio", 58, "#ffffff", 700);
      text(100, 395, "merece destaque.", 58, "#ffffff", 700);
      text(103, 435, "Apresente serviços e facilite o contato.", 21, "#bbcce3");
      button(102, 465, "Conheça nossa marca", 255);
      photo(725, 217, 372, 286, true);
      text(98, 586, "O que você encontra aqui", 28, "#1e304b", 600);
      ["Apresentação", "Serviços", "Diferenciais"].forEach((s, i) =>
        card(98 + i * 346, 608, 320, s, 117),
      );
      text(
        102,
        772,
        "Sua marca · Sobre · Contato pelo WhatsApp",
        20,
        "#667990",
      );
      break;
    case "kw-02":
      brand(94, 155);
      nav(153);
      rect(64, 184, 1072, 191, "#eef5f2", 14);
      text(
        600,
        250,
        "Sua empresa, bem apresentada.",
        43,
        "#1a3e35",
        700,
        "middle",
      );
      text(
        600,
        296,
        "Informações essenciais, perto de quem procura.",
        22,
        "#56736b",
        400,
        "middle",
      );
      button(501, 316, "Vamos conversar", 198);
      text(98, 426, "Conheça nossos serviços", 30, "#223c35", 600);
      ["Serviço principal", "Como funciona", "Sobre o negócio"].forEach(
        (s, i) => card(98 + i * 346, 455, 320, s, 167),
      );
      contact(98, 664, 1012);
      break;
    case "kw-03":
      rect(64, 110, 227, 666, "#1d2946", 14);
      brand(84, 172, true);
      ["Apresentação", "Serviços", "Diferenciais", "Contato"].forEach(
        (s, i) => {
          if (i === 0) rect(80, 233, 196, 48, "#374464", 9);
          text(98, 265 + i * 68, s, 21, "#d6e2f5", i === 0 ? 600 : 400);
        },
      );
      text(98, 642, "Sua marca,", 20, "#a7b7d5");
      text(98, 670, "do seu jeito.", 20, "#a7b7d5");
      button(84, 707, "Fale conosco", 188);
      text(329, 178, "UMA PRESENÇA CLARA", 16, model.accent, 600);
      text(329, 242, "Um espaço", 50, "#243351", 700);
      text(329, 303, "para a sua marca.", 50, "#243351", 700);
      text(329, 351, "Apresente o que seu negócio faz.", 22, "#69778d");
      button(329, 377, "Conheça os serviços", 238);
      photo(895, 159, 216, 254);
      text(329, 463, "Informações organizadas", 29, "#293b58", 600);
      ["Serviços", "Benefícios", "Sobre"].forEach((s, i) =>
        card(329 + i * 267, 489, 244, s, 139),
      );
      contact(329, 675, 786, "Fale com a gente");
      break;
    case "kw-04":
      rect(64, 110, 1072, 307, "#342d2a", 15);
      brand(99, 162, true);
      text(99, 245, "O primeiro olhar", 54, "#fff8f3", 700);
      text(99, 311, "faz a diferença.", 54, "#fff8f3", 700);
      button(103, 340, "Conheça a nossa marca", 264);
      photo(789, 147, 311, 231, true);
      rect(64, 431, 1072, 61, "#f3eae4", 10);
      ["Sobre", "Serviços", "Galeria", "Contato"].forEach((s, i) =>
        text(349 + i * 157, 470, s, 23, "#704637", 600, "middle"),
      );
      text(98, 545, "Continue conhecendo o negócio", 29, "#43352f", 600);
      ["Apresentação", "Serviços", "Diferenciais"].forEach((s, i) =>
        card(98 + i * 346, 570, 320, s, 117),
      );
      contact(98, 712, 1012);
      break;
    case "kw-05":
      rect(64, 110, 1072, 673, "#112238", 15);
      brand(98, 161, true);
      nav(159, true);
      text(98, 238, "Mostre seu trabalho.", 54, "#ffffff", 700);
      text(
        99,
        280,
        "Fotos do seu negócio, projetos ou ambiente.",
        23,
        "#b3c7df",
      );
      text(
        99,
        321,
        "Seu conteúdo visual ganha espaço para contar a história.",
        20,
        "#8eabc9",
      );
      photo(98, 355, 495, 155, true);
      photo(612, 355, 495, 155, true);
      photo(98, 529, 495, 155, true);
      photo(612, 529, 495, 155, true);
      text(99, 740, "Gostou do que viu?", 25, "#e1ecfa", 600);
      button(896, 707, "Fale conosco", 212);
      break;
    case "kw-06":
      brand(94, 155);
      nav(153);
      rect(64, 185, 1072, 194, "#f1eef7", 14);
      text(98, 253, "Informação clara.", 48, "#372c52", 700);
      text(98, 313, "Escolha simples.", 48, "#372c52", 700);
      text(99, 353, "Cada assunto tem seu lugar.", 21, "#7d7190");
      rect(869, 218, 226, 125, "#ffffff", 13);
      rect(892, 242, 47, 47, model.accent, 13);
      line(957, 252, 106, "#d5cce5");
      line(957, 274, 81, "#e8e1f0");
      line(892, 309, 167, "#e8e1f0");
      text(98, 424, "Tudo explicado em blocos", 29, "#3c3252", 600);
      card(98, 450, 496, "Serviços", 105);
      card(612, 450, 496, "Como funciona", 105);
      card(98, 574, 496, "Diferenciais", 105);
      card(612, 574, 496, "Sobre a marca", 105);
      contact(98, 711, 1010, "Pronto para conversar?");
      break;
    default:
      throw new Error("Desenho não definido para " + model.id);
  }
  rect(40, 831, 1120, 42, "#dfe8f4", 10);
  text(59, 858, model.code, 20, model.accent, 700);
  text(
    153,
    858,
    "Referência de estrutura · Imagens, textos e cores personalizáveis",
    18,
    "#546b89",
  );
  text(1140, 858, "IMAGEM ESTÁTICA", 13, "#6f829b", 600, "end");
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img"><title>' +
    esc(model.label) +
    "</title><desc>" +
    esc(model.alt) +
    "</desc>" +
    shapes.join("") +
    "</svg>\n";
  await writeFile(output + "/" + model.id + ".svg", svg);
  console.log(model.code + ": " + model.imagePath);
}
