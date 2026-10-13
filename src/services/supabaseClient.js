import { createClient } from "@supabase/supabase-js";
import { SITE } from "../data/siteInfo";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigurado = Boolean(url && anonKey);
export const WHATSAPP_NUMERO = SITE.whatsapp;

const supabase = supabaseConfigurado ? createClient(url, anonKey) : null;

export const linkWhatsApp = (mensagem) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;

export async function criarLead({ nome, contato, tipoProjeto, escopo, estimativa, mensagem }) {
  if (!supabase) {
    return { data: null, error: new Error("Supabase não configurado") };
  }

  try {
    const { data, error } = await supabase.from("leads_kroma").insert({
      nome,
      contato,
      tipo_projeto: tipoProjeto,
      escopo,
      estimativa,
      mensagem,
    });
    return { data, error };
  } catch (error) {
    return { data: null, error };
  }
}
