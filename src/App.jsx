import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Zap, Heart, Map, Home, Backpack, Skull, AlertTriangle, 
  Package, ArchiveRestore, Coffee, PlusSquare, Crosshair, Shirt, 
  Scissors, Coins, Store, Navigation, MapPin, User, ShoppingCart, 
  Activity, Star, Hammer, Key
} from 'lucide-react';

// ==========================================
// 🎨 DATABASE IMMAGINI
// ==========================================
const CUSTOM_IMAGES = {
  'Pistola Glock': 'https://i.postimg.cc/Hntpf5KC/Screenshot_20260330_143029_4.jpg',
  'Fucile M16': 'https://i.postimg.cc/MHw6Pt9c/Screenshot_20260330_143029_5.jpg',
  'Fucile AK-47': 'https://i.postimg.cc/yxK1QnLB/Screenshot_20260330_143029_12.jpg',
  'Mitraglietta Uzi': 'https://i.postimg.cc/Qt1NJvJt/Screenshot_20260330_143029_10.jpg',
  'MP5 Silenziato': 'https://i.postimg.cc/qqGk9nFK/Screenshot_20260330_143029_11.jpg',
  'FAMAS Silenziato': 'https://i.postimg.cc/NMmGkZk0/Screenshot_20260330_143029_6.jpg',
  'Pistola Tamburo': 'https://i.postimg.cc/sxzj6KTJ/Screenshot_20260330_143029_9.jpg',
  'AK-47 Tamburo': 'https://i.postimg.cc/L5VHrfWZ/Screenshot_20260330_143029_13.jpg',
  'Mitragliatrice M249': 'https://i.postimg.cc/vTvQp9KW/Screenshot_20260330_143029_7.jpg',
  'Minigun Vulcan': 'https://i.postimg.cc/vBf8tCtZ/Screenshot_20260330_143029_8.jpg',
  'Coltellino': '', 
  'Mazza da Baseball': '', 
  'Sacca Sportiva': 'https://i.postimg.cc/cCWx9TFJ/Screenshot_20260330_142331_2.jpg',
  'Sacca a Tracolla': 'https://i.postimg.cc/cCcsVYjq/Screenshot_20260330_142331_3.jpg',
  'Zaino da Escursionismo': 'https://i.postimg.cc/T1xd7QtW/Screenshot_20260330_142331_4.jpg',
  'Zaino Tattico Militare': 'https://i.postimg.cc/h48PzWGP/Screenshot_20260330_142331_5.jpg',
  'Zaino Sopravvivenza': 'https://i.postimg.cc/D0hvj5xZ/Screenshot_20260330_142331_6.jpg', 
  'Berretto di Lana': 'https://i.postimg.cc/3Nh8S9tj/Screenshot_20260330_132744_2.jpg',
  'Giacca Casual': 'https://i.postimg.cc/wvLxQnQT/Screenshot_20260330_141043_5.jpg',
  'Jeans Strappati': 'https://i.postimg.cc/D0c2tsNc/Screenshot_20260330_164352_2.jpg',
  'Scarpe da Ginnastica': 'https://i.postimg.cc/L5S9Cvx5/Screenshot_20260330_141126_3.jpg',
  'Casco da Lavoro': 'https://i.postimg.cc/PJMtBZ7g/Screenshot_20260330_132744_3.jpg',
  'Giubbotto di Pelle': 'https://i.postimg.cc/2yxzPvtZ/Screenshot_20260330_141043_6.jpg',
  'Pantaloni Cargo': 'https://i.postimg.cc/tJbqSDB7/Screenshot_20260330_164352_3.jpg',
  'Scarponi da Lavoro': 'https://i.postimg.cc/MHYWHRLd/Screenshot_20260330_141126_4.jpg',
  'Cappello Mimetico': 'https://i.postimg.cc/T1xd7Qt9/Screenshot_20260330_132744_4.jpg',
  'Giacca da Caccia': 'https://i.postimg.cc/hvnDyM2K/Screenshot_20260330_141043_7.jpg',
  'Pantaloni da Sopravvivenza': 'https://i.postimg.cc/BbCqdDzw/Screenshot_20260330_164352_4.jpg',
  'Stivali da Trekking': 'https://i.postimg.cc/3Nh8S9t8/Screenshot_20260330_141126_5.jpg',
  'Casco Antisommossa': 'https://i.postimg.cc/wX5Ty8BB/Screenshot_20260330_132744_5.jpg',
  'Corazza Antisommossa': 'https://i.postimg.cc/qqGk9nFw/Screenshot_20260330_141043_8.jpg',
  'Pantaloni Antisommossa': 'https://i.postimg.cc/rsTVngfD/Screenshot_20260330_164352_5.jpg',
  'Anfibi Antisommossa': 'https://i.postimg.cc/Wz72QryH/Screenshot_20260330_141126_6.jpg',
  'Casco Hazmat Potenziato': 'https://i.postimg.cc/mZyRXxcg/Screenshot_20260401_162946_6.jpg',
  'Corazza Hazmat Potenziata': 'https://i.postimg.cc/qBx0bftB/Screenshot_20260401_170202_7.jpg',
  'Pantaloni Hazmat Potenziati': 'https://i.postimg.cc/59S17cXZ/Screenshot_20260401_174125_6.jpg',
  'Stivali Hazmat Potenziati': 'https://i.postimg.cc/L43RCdJc/Screenshot_20260401_174049_6.jpg',
  'Casco da Pompiere': 'https://i.postimg.cc/L43RCdqR/Screenshot_20260401_162946_3.jpg', 'Giacca da Pompiere': 'https://i.postimg.cc/c1BZ9qK6/Screenshot_20260401_170202_4.jpg', 'Pantaloni da Pompiere': 'https://i.postimg.cc/SQfqT0nP/Screenshot_20260401_174125_3.jpg', 'Stivali da Pompiere': 'https://i.postimg.cc/8kmDK87X/Screenshot_20260401_174049_3.jpg',
  'Berretto Sportivo': 'https://i.postimg.cc/nVGZR8sf/Screenshot_20260401_162946_2.jpg', 'Felpa con Cappuccio': 'https://i.postimg.cc/Y2zknc4q/Screenshot_20260401_170202_2.jpg', 'Pantaloni Sportivi': 'https://i.postimg.cc/Y2zkncvV/Screenshot_20260401_174125_2.jpg', 'Scarpe da Corsa': 'https://i.postimg.cc/PfQh3GC9/Screenshot_20260401_174049_2.jpg',
  'Cappuccio CBRN': 'https://i.postimg.cc/qBx0bftd/Screenshot_20260401_162946_4.jpg', 'Tuta CBRN': 'https://i.postimg.cc/2j7mcpq1/Screenshot_20260401_170202_5.jpg', 'Pantaloni CBRN': 'https://i.postimg.cc/CMsYPyZZ/Screenshot_20260401_174125_4.jpg', 'Stivali CBRN': 'https://i.postimg.cc/c1BZ9qvP/Screenshot_20260401_174049_4.jpg',
  'Casco Forze Speciali': 'https://i.postimg.cc/nVGZR8sb/Screenshot_20260401_162946_5.jpg', 'Corazza Forze Speciali': 'https://i.postimg.cc/66fwjs7y/Screenshot_20260401_170202_6.jpg', 'Pantaloni Forze Speciali': 'https://i.postimg.cc/050xWgzB/Screenshot_20260401_174125_5.jpg', 'Anfibi Forze Speciali': 'https://i.postimg.cc/2j7mcpqp/Screenshot_20260401_174049_5.jpg',
  'Casco Juggernaut': 'https://i.postimg.cc/x8Qfxg6y/Screenshot_20260330_132744_6.jpg', 'Corazza Juggernaut': 'https://i.postimg.cc/nrxFRT3x/Screenshot_20260330_141043_4.jpg', 'Pantaloni Juggernaut': 'https://i.postimg.cc/5ymxZvr5/Screenshot_20260330_164352_6.jpg', 'Stivali Juggernaut': 'https://i.postimg.cc/VvwfG4K0/Screenshot_20260330_141126_7.jpg',
  'Nastro Adesivo': 'https://i.postimg.cc/ZqLhByvg/1775062687389_10.jpg', 'Zucchero Grezzo': 'https://i.postimg.cc/SKGp2zYv/1775062687389_11.jpg', 'Caffè in Grani': 'https://i.postimg.cc/TPcXLW59/1775062687389_12.jpg', 'Lingotto di Rame': 'https://i.postimg.cc/5tmMYFQZ/1775062687389_13.jpg',
  'Batteria al Litio': 'https://i.postimg.cc/jjhrwJnp/1775062687389_14.jpg', 'Orologio d\'Epoca': 'https://i.postimg.cc/vmysZvTS/1775062687389_5.jpg', 'Disinfettante': 'https://i.postimg.cc/nL1tjQ9T/1775062687389_6.jpg', 'Carburante Sintetico': 'https://i.postimg.cc/zfNrGkv2/1775062687389_7.jpg',
  'Scheda Madre Intatta': 'https://i.postimg.cc/MGY8Mjjk/1775062687389_8.jpg', 'Chiavetta USB Criptata': 'https://i.postimg.cc/CK4VBfn6/1775062687389_9.jpg',
  'Assi di Legno': '', 'Chiodi': '', 'Mattoni in Cotto': '', 'Tubi d\'Acciaio': '',
  'Chiave d\'Accesso Linate': ''
};

const CUSTOM_ENEMIES_IMAGES = {
  'Lurker': '', 'Slasher': '', 'Rioter': '', 'Chimera': '', 'Gilbert': '',
  'Ratto Mutante': '', 'Randagio': '', 'Sputa-Acido': '', 'Cacciatore Cieco': '', 'Golia': ''
};

// --- STILE E RARITÀ ---
const RARITY = {
  comune: { color: 'text-stone-300', border: 'border-stone-500', shadow: 'rgba(120, 113, 108, 0.4)', name: 'Comune', xp: 0 },
  raro: { color: 'text-blue-300', border: 'border-blue-500', shadow: 'rgba(59, 130, 246, 0.4)', name: 'Raro', xp: 15 },
  epico: { color: 'text-purple-400', border: 'border-purple-500', shadow: 'rgba(168, 85, 247, 0.4)', name: 'Epico', xp: 40 },
  leggendario: { color: 'text-amber-500', border: 'border-amber-500', shadow: 'rgba(245, 158, 11, 0.4)', name: 'Leggenda', xp: 100 },
  mitico: { color: 'text-red-500', border: 'border-red-500', shadow: 'rgba(239, 68, 68, 0.6)', name: 'Mitico', xp: 250 }
};

// --- DATABASE NEMICI ---
const ENEMIES_DB = {
  'Ratto Mutante': { name: 'Ratto Mutante', hp: 20, atk: 6, def: 0, desc: 'Un topo gigantesco, debole ma aggressivo.' },
  'Randagio': { name: 'Randagio', hp: 35, atk: 12, def: 1, desc: 'Cane infetto, veloce e letale in branco.' },
  'Lurker': { name: 'Lurker', hp: 50, atk: 18, def: 2, desc: 'Mutante standard. Imprevedibile.' },
  'Sputa-Acido': { name: 'Sputa-Acido', hp: 60, atk: 35, def: 2, desc: 'Spara muchi corrosivi dalla distanza.' },
  'Slasher': { name: 'Slasher', hp: 85, atk: 30, def: 5, desc: 'Occhi rossi luminosi. Usa armi da taglio.' },
  'Cacciatore Cieco': { name: 'Cacciatore Cieco', hp: 110, atk: 45, def: 10, desc: 'Sente ogni tuo respiro. Danni devastanti.' },
  'Rioter': { name: 'Rioter', hp: 160, atk: 25, def: 25, desc: 'Armatura antiproiettile fusa con la pelle.' },
  'Golia': { name: 'Golia', hp: 300, atk: 30, def: 40, desc: 'Un colosso lentissimo ma quasi invulnerabile.' },
  'Chimera': { name: 'Chimera', hp: 500, atk: 70, def: 45, desc: 'BOSS: Abominio genetico. Estremamente veloce.' },
  'Gilbert': { name: 'Gilbert', hp: 650, atk: 95, def: 55, desc: 'BOSS: Armato di fucile a pompa R8. Devastante.' }
};

// --- DATABASE OGGETTI ---
const ITEMS = {
  // Consumabili & Cure
  'Acqua Purificata': { type: 'consumable', rarity: 'comune', value: 5, heal: 0, desc: 'Idratazione essenziale.', iconType: Coffee },
  'Razione K': { type: 'consumable', rarity: 'comune', value: 8, heal: 5, desc: 'Cibo liofilizzato.', iconType: Package },
  'Zucchero Grezzo': { type: 'consumable', rarity: 'comune', value: 15, heal: 5, desc: 'Picco di energia.', iconType: Coffee },
  'Bende': { type: 'medical', rarity: 'comune', value: 12, heal: 20, desc: 'Ferma le emorragie.', iconType: PlusSquare },
  'Medikit': { type: 'medical', rarity: 'raro', value: 40, heal: 60, desc: 'Kit tattico medico.', iconType: PlusSquare },
  'Disinfettante': { type: 'medical', rarity: 'epico', value: 70, heal: 40, desc: 'Previene infezioni.', iconType: PlusSquare },
  
  // Risorse & Costruzione
  'Rottami': { type: 'resource', rarity: 'comune', value: 2, desc: 'Metallo arrugginito.', iconType: Package },
  'Nastro Adesivo': { type: 'resource', rarity: 'comune', value: 5, desc: 'Riparazioni rapide.', iconType: Package },
  'Assi di Legno': { type: 'resource', rarity: 'comune', value: 3, desc: 'Materiale da costruzione base.', iconType: Hammer },
  'Chiodi': { type: 'resource', rarity: 'comune', value: 2, desc: 'Utili per fortificare.', iconType: Hammer },
  'Componenti Elettronici': { type: 'resource', rarity: 'raro', value: 15, desc: 'Chip e circuiti.', iconType: Zap },
  'Munizioni 9mm': { type: 'resource', rarity: 'comune', value: 10, desc: 'Proiettili leggeri.', iconType: Crosshair },
  'Caffè in Grani': { type: 'resource', rarity: 'raro', value: 35, desc: 'Lusso del vecchio mondo.', iconType: Coffee },
  'Lingotto di Rame': { type: 'resource', rarity: 'raro', value: 50, desc: 'Conduttore.', iconType: Zap },
  'Mattoni in Cotto': { type: 'resource', rarity: 'raro', value: 8, desc: 'Solidi e pesanti.', iconType: Hammer },
  'Munizioni 5.56': { type: 'resource', rarity: 'epico', value: 25, desc: 'Proiettili perforanti.', iconType: Crosshair },
  'Batteria al Litio': { type: 'resource', rarity: 'epico', value: 60, desc: 'Parzialmente carica.', iconType: Zap },
  'Orologio d\'Epoca': { type: 'resource', rarity: 'epico', value: 80, desc: 'Meccanismo intatto.', iconType: Coins },
  'Tubi d\'Acciaio': { type: 'resource', rarity: 'epico', value: 15, desc: 'Strutture portanti.', iconType: Hammer },
  'Cimelio d\'Oro': { type: 'resource', rarity: 'leggendario', value: 150, desc: 'Oro puro.', iconType: Coins },
  'Carburante Sintetico': { type: 'resource', rarity: 'leggendario', value: 120, desc: 'Altamente infiammabile.', iconType: Zap },
  'Scheda Madre Intatta': { type: 'resource', rarity: 'leggendario', value: 150, desc: 'Elettronica militare.', iconType: Zap },
  'Disco Dati Governativo': { type: 'resource', rarity: 'mitico', value: 500, desc: 'Codici di sicurezza.', iconType: Package },
  'Chiavetta USB Criptata': { type: 'resource', rarity: 'mitico', value: 300, desc: 'Progetti top-secret.', iconType: Package },
  'Chiave d\'Accesso Linate': { type: 'resource', rarity: 'mitico', value: 1000, desc: 'Tessera d\'accesso Aeroporto.', iconType: Key },

  // Zaini
  'Sacca Sportiva': { type: 'backpack', rarity: 'comune', value: 20, slots: 10, desc: '10 Slot', iconType: Backpack },
  'Sacca a Tracolla': { type: 'backpack', rarity: 'raro', value: 50, slots: 15, desc: '15 Slot', iconType: Backpack },
  'Zaino da Escursionismo': { type: 'backpack', rarity: 'epico', value: 120, slots: 20, desc: '20 Slot', iconType: Backpack },
  'Zaino Tattico Militare': { type: 'backpack', rarity: 'leggendario', value: 250, slots: 25, desc: '25 Slot', iconType: Backpack },
  'Zaino Sopravvivenza': { type: 'backpack', rarity: 'mitico', value: 600, slots: 30, desc: '30 Slot', iconType: Backpack },

  // Armi
  'Coltellino': { type: 'weapon', rarity: 'comune', value: 10, atk: 5, desc: 'Lama corta.', iconType: Crosshair },
  'Mazza da Baseball': { type: 'weapon', rarity: 'comune', value: 20, atk: 12, desc: 'Pesante.', iconType: Crosshair },
  'Pistola Glock': { type: 'weapon', rarity: 'raro', value: 80, atk: 25, desc: 'Affidabile 9mm.', iconType: Crosshair },
  'Mitraglietta Uzi': { type: 'weapon', rarity: 'raro', value: 120, atk: 35, desc: 'Alta cadenza.', iconType: Crosshair },
  'Fucile M16': { type: 'weapon', rarity: 'epico', value: 200, atk: 45, desc: 'Fucile standard.', iconType: Crosshair },
  'MP5 Silenziato': { type: 'weapon', rarity: 'epico', value: 220, atk: 48, desc: 'Letale e furtivo.', iconType: Crosshair },
  'Fucile AK-47': { type: 'weapon', rarity: 'leggendario', value: 300, atk: 55, desc: 'Potenza pura.', iconType: Crosshair },
  'FAMAS Silenziato': { type: 'weapon', rarity: 'leggendario', value: 350, atk: 65, desc: 'Bullpup tattico.', iconType: Crosshair },
  'Pistola Tamburo': { type: 'weapon', rarity: 'leggendario', value: 380, atk: 70, desc: 'Alta capienza.', iconType: Crosshair },
  'AK-47 Tamburo': { type: 'weapon', rarity: 'mitico', value: 500, atk: 85, desc: 'Inarrestabile.', iconType: Crosshair },
  'Mitragliatrice M249': { type: 'weapon', rarity: 'mitico', value: 900, atk: 120, desc: 'Fuoco di soppressione.', iconType: Crosshair },
  'Minigun Vulcan': { type: 'weapon', rarity: 'mitico', value: 1500, atk: 200, desc: 'Devastazione.', iconType: Crosshair },

  // Armature Base
  'Berretto di Lana': { type: 'helmet', rarity: 'comune', value: 5, def: 1, desc: 'Protezione minima.', iconType: Shield },
  'Giacca Casual': { type: 'chest', rarity: 'comune', value: 10, def: 3, desc: 'Tessuto leggero.', iconType: Shirt },
  'Jeans Strappati': { type: 'pants', rarity: 'comune', value: 8, def: 2, desc: 'Usurati.', iconType: Scissors },
  'Scarpe da Ginnastica': { type: 'shoes', rarity: 'comune', value: 8, def: 1, desc: 'Comode.', iconType: User },

  // Set Armature Misti
  'Berretto Sportivo': { type: 'helmet', rarity: 'raro', value: 15, def: 2, desc: 'Traspirante.', iconType: Shield },
  'Felpa con Cappuccio': { type: 'chest', rarity: 'raro', value: 25, def: 5, desc: 'Comoda per muoversi.', iconType: Shirt },
  'Pantaloni Sportivi': { type: 'pants', rarity: 'raro', value: 20, def: 3, desc: 'Agili.', iconType: Scissors },
  'Scarpe da Corsa': { type: 'shoes', rarity: 'raro', value: 25, def: 3, desc: 'Ottime per fuggire.', iconType: User },

  'Casco da Lavoro': { type: 'helmet', rarity: 'raro', value: 20, def: 4, desc: 'Plastica rigida.', iconType: Shield },
  'Giubbotto di Pelle': { type: 'chest', rarity: 'raro', value: 35, def: 8, desc: 'Evita i morsi.', iconType: Shirt },
  'Pantaloni Cargo': { type: 'pants', rarity: 'raro', value: 25, def: 5, desc: 'Resistente.', iconType: Scissors },
  'Scarponi da Lavoro': { type: 'shoes', rarity: 'raro', value: 20, def: 4, desc: 'Punta rinforzata.', iconType: User },

  'Casco da Pompiere': { type: 'helmet', rarity: 'raro', value: 25, def: 5, desc: 'Isolante termico.', iconType: Shield },
  'Giacca da Pompiere': { type: 'chest', rarity: 'raro', value: 40, def: 10, desc: 'Tessuto ignifugo.', iconType: Shirt },
  'Pantaloni da Pompiere': { type: 'pants', rarity: 'raro', value: 30, def: 6, desc: 'Bande riflettenti.', iconType: Scissors },
  'Stivali da Pompiere': { type: 'shoes', rarity: 'raro', value: 25, def: 5, desc: 'Suola anti-perforazione.', iconType: User },

  'Cappello Mimetico': { type: 'helmet', rarity: 'epico', value: 45, def: 7, desc: 'Materiale tecnico.', iconType: Shield },
  'Giacca da Caccia': { type: 'chest', rarity: 'epico', value: 80, def: 14, desc: 'Isolante termico.', iconType: Shirt },
  'Pantaloni da Sopravvivenza': { type: 'pants', rarity: 'epico', value: 65, def: 11, desc: 'Kevlar.', iconType: Scissors },
  'Stivali da Trekking': { type: 'shoes', rarity: 'epico', value: 55, def: 9, desc: 'Ottima aderenza.', iconType: User },

  'Cappuccio CBRN': { type: 'helmet', rarity: 'epico', value: 60, def: 6, radProtect: 1, desc: 'Maschera antigas tattica.', iconType: Shield },
  'Tuta CBRN': { type: 'chest', rarity: 'epico', value: 100, def: 12, radProtect: 1, desc: 'Isolamento agenti chimici.', iconType: Shirt },
  'Pantaloni CBRN': { type: 'pants', rarity: 'epico', value: 80, def: 10, desc: 'Gomma sintetica.', iconType: Scissors },
  'Stivali CBRN': { type: 'shoes', rarity: 'epico', value: 70, def: 8, desc: 'Stivali decontaminazione.', iconType: User },

  'Casco Antisommossa': { type: 'helmet', rarity: 'leggendario', value: 140, def: 16, desc: 'Visiera balistica.', iconType: Shield },
  'Corazza Antisommossa': { type: 'chest', rarity: 'leggendario', value: 220, def: 28, desc: 'Placche anti-urto.', iconType: Shirt },
  'Pantaloni Antisommossa': { type: 'pants', rarity: 'leggendario', value: 180, def: 22, desc: 'Snodi rinforzati.', iconType: Scissors },
  'Anfibi Antisommossa': { type: 'shoes', rarity: 'leggendario', value: 150, def: 18, desc: 'Suola rinforzata.', iconType: User },

  'Casco Forze Speciali': { type: 'helmet', rarity: 'leggendario', value: 160, def: 18, desc: 'Kevlar leggero con radio.', iconType: Shield },
  'Corazza Forze Speciali': { type: 'chest', rarity: 'leggendario', value: 250, def: 30, desc: 'Piastre in ceramica.', iconType: Shirt },
  'Pantaloni Forze Speciali': { type: 'pants', rarity: 'leggendario', value: 200, def: 25, desc: 'Multitasche tattico.', iconType: Scissors },
  'Anfibi Forze Speciali': { type: 'shoes', rarity: 'leggendario', value: 180, def: 20, desc: 'Silenziosi e letali.', iconType: User },

  'Cappuccio Hazmat': { type: 'helmet', rarity: 'leggendario', value: 200, def: 8, radProtect: 1, desc: 'Filtri aria. LVL 1 RAD.', iconType: Shield },
  'Tuta Hazmat': { type: 'chest', rarity: 'leggendario', value: 300, def: 15, radProtect: 1, desc: 'Gomma isolante. LVL 1 RAD.', iconType: Shirt },
  'Pantaloni Hazmat': { type: 'pants', rarity: 'leggendario', value: 250, def: 12, desc: 'Isolamento chimico.', iconType: Scissors },
  'Stivali Hazmat': { type: 'shoes', rarity: 'leggendario', value: 180, def: 10, desc: 'Gomma spessa.', iconType: User },

  'Casco Hazmat Potenziato': { type: 'helmet', rarity: 'mitico', value: 450, def: 25, radProtect: 2, desc: 'Sensori HUD. LVL 2 RAD.', iconType: Shield },
  'Corazza Hazmat Potenziata': { type: 'chest', rarity: 'mitico', value: 700, def: 45, radProtect: 2, desc: 'Piombo e titanio. LVL 2 RAD.', iconType: Shirt },
  'Pantaloni Hazmat Potenziati': { type: 'pants', rarity: 'mitico', value: 500, def: 35, desc: 'Fibre isolanti.', iconType: Scissors },
  'Stivali Hazmat Potenziati': { type: 'shoes', rarity: 'mitico', value: 450, def: 30, desc: 'Assorbimento estremo.', iconType: User },

  'Casco Juggernaut': { type: 'helmet', rarity: 'mitico', value: 500, def: 35, desc: 'Un bunker per la testa.', iconType: Shield },
  'Corazza Juggernaut': { type: 'chest', rarity: 'mitico', value: 900, def: 60, desc: 'Carro armato umano.', iconType: Shirt },
  'Pantaloni Juggernaut': { type: 'pants', rarity: 'mitico', value: 700, def: 45, desc: 'Placche pesantissime.', iconType: Scissors },
  'Stivali Juggernaut': { type: 'shoes', rarity: 'mitico', value: 600, def: 40, desc: 'Inarrestabili.', iconType: User },
};

// Modificati loot tables per "inquinare" le zone ad alto livello con spazzatura e limitare farming
const LOCATIONS = [
  { id: 'duomo', name: 'Cratere del Duomo', type: 'danger', x: 50, y: 50, reqRad: 2, desc: 'Ground Zero. REQ: HAZMAT POTENZIATA.', lvl: 25, cost: 40, enemies: ['Chimera'], loot: ['Disco Dati Governativo', 'Chiavetta USB Criptata', 'Minigun Vulcan', 'Corazza Juggernaut', 'Casco Juggernaut', 'Zaino Sopravvivenza', 'Rottami', 'Bende', 'Acqua Purificata'], minLoot: 4, maxLoot: 6 },
  { id: 'mercato', name: 'Mercato (Cadorna)', type: 'safe', x: 37, y: 43, desc: 'Zona neutrale. Puoi scambiare oggetti.', lvl: 1, cost: 5 },
  { id: 'sempione', name: 'Foresta Sempione', type: 'danger', x: 33, y: 31, desc: 'Vegetazione fitta.', lvl: 2, cost: 10, enemies: ['Ratto Mutante', 'Randagio'], loot: ['Rottami', 'Assi di Legno', 'Felpa con Cappuccio', 'Scarpe da Corsa', 'Sacca Sportiva', 'Mazza da Baseball', 'Berretto di Lana'], minLoot: 1, maxLoot: 3 },
  { id: 'breda', name: 'Stadio Breda', type: 'danger', x: 20, y: 10, desc: 'Vecchio stadio in rovina.', lvl: 6, cost: 12, enemies: ['Randagio', 'Lurker'], loot: ['Bende', 'Sacca a Tracolla', 'Assi di Legno', 'Casco da Pompiere', 'Pistola Glock', 'Casco da Lavoro'], minLoot: 1, maxLoot: 3 },
  { id: 'caserma', name: 'Caserma Firenze', type: 'danger', x: 16, y: 15, desc: 'Avamposto abbandonato.', lvl: 10, cost: 20, enemies: ['Lurker', 'Slasher'], loot: ['Munizioni 9mm', 'Razione K', 'Chiodi', 'Tubi d\'Acciaio', 'Medikit', 'Pistola Glock', 'Giubbotto di Pelle'], minLoot: 2, maxLoot: 4 },
  { id: 'isola', name: 'Quartiere Isola', type: 'danger', x: 45, y: 20, desc: 'Vicoli stretti e grattacieli.', lvl: 11, cost: 20, enemies: ['Slasher', 'Sputa-Acido'], loot: ['Mitraglietta Uzi', 'Componenti Elettronici', 'Lingotto di Rame', 'Giacca da Pompiere', 'Zaino da Escursionismo'], minLoot: 2, maxLoot: 4 },
  { id: 'ospedale', name: 'Policlinico', type: 'danger', x: 54, y: 60, desc: 'Forniture mediche.', lvl: 12, cost: 25, enemies: ['Rioter', 'Sputa-Acido'], loot: ['Medikit', 'Disinfettante', 'Tuta CBRN', 'Zaino da Escursionismo', 'Pantaloni Cargo', 'MP5 Silenziato', 'Rottami'], minLoot: 3, maxLoot: 5 },
  { id: 'm5', name: 'Metro M5 (Lilla)', type: 'danger', x: 30, y: 40, desc: 'Tunnel sotterranei bui.', lvl: 15, cost: 25, enemies: ['Rioter', 'Cacciatore Cieco'], loot: ['MP5 Silenziato', 'Munizioni 5.56', 'Orologio d\'Epoca', 'Cappuccio CBRN', 'Zaino Tattico Militare', 'Bende'], minLoot: 2, maxLoot: 4 },
  { id: 'monumentale', name: 'Cimitero Monumentale', type: 'danger', x: 35, y: 25, desc: 'Silenzio di tomba.', lvl: 16, cost: 25, enemies: ['Cacciatore Cieco', 'Sputa-Acido'], loot: ['Medikit', 'Batteria al Litio', 'Fucile M16', 'Pantaloni CBRN', 'Acqua Purificata'], minLoot: 2, maxLoot: 4 },
  { id: 'centrale', name: 'Stazione Centrale', type: 'danger', x: 61, y: 15, desc: 'Covo dei Predoni.', lvl: 18, cost: 30, enemies: ['Golia', 'Rioter', 'Slasher'], loot: ['Munizioni 5.56', 'Fucile AK-47', 'Casco Forze Speciali', 'Zaino Tattico Militare', 'Cimelio d\'Oro', 'Casco Antisommossa', 'Rottami'], minLoot: 3, maxLoot: 5 },
  { id: 'fiera', name: 'Fiera Milano', type: 'danger', x: 10, y: 25, desc: 'Enorme polo espositivo.', lvl: 20, cost: 30, enemies: ['Golia', 'Sputa-Acido'], loot: ['Fucile AK-47', 'Zaino da Escursionismo', 'Corazza Forze Speciali', 'Carburante Sintetico', 'Chiodi', 'Acqua Purificata'], minLoot: 3, maxLoot: 5 },
  { id: 'castello', name: 'Castello Sforzesco', type: 'danger', x: 40, y: 35, desc: 'Fortezza espugnata.', lvl: 22, cost: 35, enemies: ['Golia', 'Chimera'], loot: ['Mitragliatrice M249', 'Scheda Madre Intatta', 'Corazza Juggernaut', 'Anfibi Forze Speciali', 'Razione K', 'Rottami'], minLoot: 3, maxLoot: 5 },
  { id: 'rifugio', name: 'Il Tuo Rifugio', type: 'safe', x: 79, y: 26, desc: 'La tua base operativa.', lvl: 1, cost: 0 },
  { id: 'navigli', name: 'Paludi Darsena', type: 'danger', x: 37, y: 70, desc: 'Fanghi tossici.', lvl: 5, cost: 15, enemies: ['Lurker', 'Ratto Mutante'], loot: ['Rottami', 'Assi di Legno', 'Bende', 'Pantaloni Sportivi', 'Berretto Sportivo', 'Giacca Casual'], minLoot: 2, maxLoot: 4 },
  { id: 'idroscalo', name: 'Idroscalo Tossico', type: 'danger', x: 92, y: 65, reqRad: 1, desc: 'Gas venefici. REQ: TUTA HAZMAT.', lvl: 20, cost: 35, enemies: ['Sputa-Acido', 'Golia'], loot: ['AK-47 Tamburo', 'Pistola Tamburo', 'Munizioni 5.56', 'Pantaloni Juggernaut', 'Tuta Hazmat', 'Bende', 'Rottami'], minLoot: 3, maxLoot: 5 },
  { id: 'linate', name: 'Linate (Aeroporto)', type: 'danger', x: 88, y: 80, reqKey: 'Chiave d\'Accesso Linate', desc: 'Area blindata. REQ: CHIAVE LINATE.', lvl: 28, cost: 45, enemies: ['Gilbert'], loot: ['Mitragliatrice M249', 'Stivali Juggernaut', 'Pantaloni Hazmat Potenziati', 'Stivali Hazmat Potenziati', 'Acqua Purificata', 'Nastro Adesivo'], minLoot: 4, maxLoot: 6 }
];

const MAX_ENERGY = 100;
const BASE_ATK = 5;
const BASE_DEF = 0;

// --- HELPER SICUREZZA ---
const safeName = (item) => typeof item === 'string' ? item : (item?.name || '');
const safeItem = (name) => ITEMS[name] || { type: 'resource', rarity: 'comune', value: 0, desc: 'Oggetto Sconosciuto' };

const createItemObj = (nameStr) => {
  const isEquipment = ['weapon', 'helmet', 'chest', 'pants', 'shoes'].includes(ITEMS[nameStr]?.type);
  return { id: Math.random().toString(36).substr(2, 9), name: nameStr, dura: isEquipment ? 100 : null };
};

export default function App() {
  const [gameState, setGameState] = useState('start');
  const [view, setView] = useState('equipment');
  const [marketTab, setMarketTab] = useState('sell'); 
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  
  const currentMaxHp = 100; // HP bloccati a 100
  const [hp, setHp] = useState(currentMaxHp);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [credits, setCredits] = useState(100);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [deathReason, setDeathReason] = useState('');
  const [shelterLevel, setShelterLevel] = useState(1);

  const [equipped, setEquipped] = useState({
    helmet: createItemObj('Berretto di Lana'), 
    chest: createItemObj('Giacca Casual'), 
    pants: createItemObj('Jeans Strappati'), 
    shoes: createItemObj('Scarpe da Ginnastica'), 
    weapon: createItemObj('Coltellino'), // Inizia poverissimo
    backpack: createItemObj('Sacca Sportiva')
  });

  const [inventory, setInventory] = useState([createItemObj('Acqua Purificata'), createItemObj('Razione K'), createItemObj('Bende')]); 
  const [stash, setStash] = useState([createItemObj('Acqua Purificata'), createItemObj('Razione K'), createItemObj('Rottami')]); 
  
  const [logs, setLogs] = useState([{ text: 'Stazione operativa avviata.', type: 'info' }]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [combatState, setCombatState] = useState(null);
  const [pendingLoot, setPendingLoot] = useState(null);
  
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelTarget, setTravelTarget] = useState(null);
  const [isEnemyTurn, setIsEnemyTurn] = useState(false);
  const [loadError, setLoadError] = useState('');

  const logEndRef = useRef(null);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  // Game Over
  useEffect(() => { 
    if (hp <= 0 && !gameOver) {
      setGameOver(true); setCombatState(null); setPendingLoot(null);
    }
  }, [hp, gameOver]);

  // Level Up: No HP/Energy restore anymore
  useEffect(() => {
    const requiredXp = level * 100;
    if (xp >= requiredXp) {
      setLevel(prev => prev + 1); setXp(prev => prev - requiredXp);
      addLog(`⬆️ LIVELLO ${level + 1} RAGGIUNTO!`, 'success');
    }
  }, [xp, level]);

  const getMaxInventory = () => equipped.backpack ? (safeItem(safeName(equipped.backpack))?.slots || 5) : 5;
  const getMaxStash = () => 20 + (shelterLevel - 1) * 30;

  const getAtk = () => BASE_ATK + (equipped.weapon ? (safeItem(safeName(equipped.weapon))?.atk || 0) : 0);
  const getDef = () => BASE_DEF + 
    (equipped.helmet ? (safeItem(safeName(equipped.helmet))?.def || 0) : 0) +
    (equipped.chest ? (safeItem(safeName(equipped.chest))?.def || 0) : 0) +
    (equipped.pants ? (safeItem(safeName(equipped.pants))?.def || 0) : 0) +
    (equipped.shoes ? (safeItem(safeName(equipped.shoes))?.def || 0) : 0);

  const getRadProtect = () => {
    let rads = 0;
    if (equipped.helmet) rads += safeItem(safeName(equipped.helmet))?.radProtect || 0;
    if (equipped.chest) rads += safeItem(safeName(equipped.chest))?.radProtect || 0;
    return rads;
  };

  const addLog = (text, type = 'info') => setLogs(prev => [...prev.slice(-15), { text, type }]);

  const damageEquipment = (type, amount) => {
    setEquipped(prev => {
        if (!prev[type] || prev[type].dura === null || prev[type].dura === undefined) return prev;
        const newDura = prev[type].dura - amount;
        if (newDura <= 0) {
            addLog(`💥 IL TUO ${safeName(prev[type]).toUpperCase()} SI È DISTRUTTO!`, 'danger');
            return { ...prev, [type]: null };
        }
        return { ...prev, [type]: { ...prev[type], dura: newDura } };
    });
  };

  const handleItemAction = (e, itemObj, index, context) => {
    e.stopPropagation();
    if (!itemObj) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const widgetWidth = 280; const widgetHeight = 230; 
    let calcLeft = rect.left + rect.width / 2;
    let calcTop = rect.bottom + 8; 

    if (calcLeft - widgetWidth / 2 < 10) calcLeft = widgetWidth / 2 + 10;
    if (calcLeft + widgetWidth / 2 > window.innerWidth - 10) calcLeft = window.innerWidth - widgetWidth / 2 - 10;
    if (calcTop + widgetHeight > window.innerHeight) {
        calcTop = rect.top - widgetHeight - 8;
        if (calcTop < 10) calcTop = window.innerHeight / 2 - widgetHeight / 2; 
    }
    setPopupPos({ top: calcTop, left: calcLeft });
    
    const name = safeName(itemObj);
    setSelectedItem({ obj: itemObj, name: name, index, context, data: safeItem(name) });
  };

  const chiudiPopup = () => setSelectedItem(null);

  const equipItem = () => {
    if (!selectedItem) return;
    const { obj, index, data } = selectedItem;
    if (data.type === 'backpack' && inventory.length - 1 > data.slots) { addLog('Svuota lo zaino prima di cambiarlo!', 'warning'); chiudiPopup(); return; }

    let currentEquipped = equipped[data.type];
    let newInventory = [...inventory];
    newInventory.splice(index, 1);
    if (currentEquipped) newInventory.push(currentEquipped);
    
    setInventory(newInventory); setEquipped(prev => ({ ...prev, [data.type]: obj }));
    addLog(`Equipaggiato: ${safeName(obj)}`, 'success'); chiudiPopup();
  };

  const unequipItem = (type) => {
    const itemObj = equipped[type];
    if (!itemObj) return;
    if (type === 'backpack') { addLog('Sostituisci lo zaino con un altro.', 'warning'); chiudiPopup(); return; }
    if (inventory.length >= getMaxInventory()) { addLog('Inventario pieno.', 'warning'); chiudiPopup(); return; }

    setEquipped(prev => ({ ...prev, [type]: null })); setInventory(prev => [...prev, itemObj]);
    addLog(`Rimosso: ${safeName(itemObj)}`, 'info'); chiudiPopup();
  };

  const useItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    if (data.type === 'medical' || data.type === 'consumable') {
      if (hp >= currentMaxHp) { addLog('Salute al massimo.', 'warning'); chiudiPopup(); return; }
      setHp(prev => Math.min(currentMaxHp, prev + data.heal));
      let newInv = [...inventory]; newInv.splice(index, 1); setInventory(newInv);
      addLog(`Usato ${name}. (+${data.heal} HP)`, 'success'); chiudiPopup();
    }
  };

  const moveItem = (fromArray, setFromArray, toArray, setToArray, index, toMax) => {
    if (toArray.length >= toMax) { addLog('Spazio insufficiente.', 'warning'); chiudiPopup(); return; }
    const itemObj = fromArray[index]; const newFrom = [...fromArray]; newFrom.splice(index, 1);
    setFromArray(newFrom); setToArray(prev => [...prev, itemObj]); chiudiPopup();
  };

  const sellItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    setCredits(prev => prev + (data.value || 0));
    let newInv = [...inventory]; newInv.splice(index, 1); setInventory(newInv);
    addLog(`Venduto ${name}`, 'success'); chiudiPopup();
  };

  const buyLootbox = (type) => {
    let cost = 0; let pool = [];
    if (type === 'base') {
        cost = 100; pool = Object.keys(ITEMS).filter(k => ITEMS[k].rarity === 'comune' || ITEMS[k].rarity === 'raro');
    } else if (type === 'tattica') {
        cost = 300; pool = Object.keys(ITEMS).filter(k => ITEMS[k].rarity === 'raro' || ITEMS[k].rarity === 'epico' || ITEMS[k].rarity === 'leggendario');
    } else if (type === 'nera') {
        cost = 1000; pool = Object.keys(ITEMS).filter(k => (ITEMS[k].rarity === 'leggendario' || ITEMS[k].rarity === 'mitico') && ['weapon', 'chest', 'helmet', 'pants', 'shoes'].includes(ITEMS[k].type));
    }

    if (credits < cost) { addLog('❌ Crediti insufficienti.', 'danger'); return; }
    if (inventory.length >= getMaxInventory()) { addLog('❌ Lo zaino è pieno.', 'warning'); return; }

    setCredits(prev => prev - cost);
    const wonItemStr = pool[Math.floor(Math.random() * pool.length)];
    setInventory(prev => [...prev, createItemObj(wonItemStr)]);
    
    const itemInfo = safeItem(wonItemStr);
    const xpGained = RARITY[itemInfo.rarity]?.xp || 0;
    if(xpGained > 0) setXp(prev => prev + xpGained);
    addLog(`🎁 Trovato: ${wonItemStr}`, 'success');
  };

  const upgradeShelter = () => {
      const costs = {
          1: { 'Assi di Legno': 10, 'Chiodi': 5 },
          2: { 'Assi di Legno': 20, 'Chiodi': 15, 'Mattoni in Cotto': 10 },
          3: { 'Mattoni in Cotto': 30, 'Tubi d\'Acciaio': 10 }
      };
      if (shelterLevel >= 4) { addLog('Rifugio al livello massimo!', 'warning'); return; }
      
      const reqs = costs[shelterLevel];
      let hasAll = true; let missingMsg = 'Mancano: ';
      
      const allItems = [...inventory, ...stash];
      const itemsCount = {};
      allItems.forEach(i => { const name = safeName(i); itemsCount[name] = (itemsCount[name] || 0) + 1; });

      for (const [resName, required] of Object.entries(reqs)) {
          if ((itemsCount[resName] || 0) < required) {
              hasAll = false;
              missingMsg += `${resName} (${itemsCount[resName]||0}/${required}) `;
          }
      }

      if (!hasAll) { addLog(missingMsg, 'danger'); return; }

      let remainingToRemove = { ...reqs };
      let newStash = [...stash]; let newInv = [...inventory];

      for (const resName of Object.keys(remainingToRemove)) {
          while (remainingToRemove[resName] > 0) {
              let stashIdx = newStash.findIndex(i => safeName(i) === resName);
              if (stashIdx !== -1) { newStash.splice(stashIdx, 1); remainingToRemove[resName]--; continue; }
              
              let invIdx = newInv.findIndex(i => safeName(i) === resName);
              if (invIdx !== -1) { newInv.splice(invIdx, 1); remainingToRemove[resName]--; continue; }
              break; 
          }
      }

      setStash(newStash); setInventory(newInv); setShelterLevel(prev => prev + 1);
      addLog(`🛠️ RIFUGIO MIGLIORATO AL LIVELLO ${shelterLevel + 1}! Cassa espansa.`, 'success');
  };

  // LIMITI DI BOTTINO PUNITIVI
  const generateAndShowLoot = (loc) => {
    const numItems = Math.floor(Math.random() * (loc.maxLoot - loc.minLoot + 1)) + loc.minLoot;
    let found = []; 
    let uniqueEquipmentFound = new Set(); 
    let mythicCount = 0;
    let legendaryCount = 0;

    for (let i = 0; i < numItems; i++) {
      let attempts = 0; let finalItemStr = null;
      while (attempts < 15) {
        let candidate = loc.loot[Math.floor(Math.random() * loc.loot.length)];
        let itemData = safeItem(candidate);
        let candidateType = itemData?.type;
        let candidateRarity = itemData?.rarity;

        // Limiti massimi per raid
        if (candidateRarity === 'mitico' && mythicCount >= 1) { attempts++; continue; }
        if (candidateRarity === 'leggendario' && legendaryCount >= 2) { attempts++; continue; }

        if (!['weapon', 'helmet', 'chest', 'pants', 'shoes', 'backpack'].includes(candidateType)) { 
            finalItemStr = candidate; break; 
        }
        
        if (!found.some(f => safeName(f) === candidate) && !uniqueEquipmentFound.has(candidate)) {
          finalItemStr = candidate; uniqueEquipmentFound.add(candidate); break;
        }
        attempts++;
      }

      if (finalItemStr) {
          let iData = safeItem(finalItemStr);
          if (iData.rarity === 'mitico') mythicCount++;
          if (iData.rarity === 'leggendario') legendaryCount++;
          found.push(createItemObj(finalItemStr)); 
      }
    }

    if (found.length > 0) { setPendingLoot({ items: found, location: loc }); } 
    else { addLog('Zona perquisita, non hai trovato nulla.', 'warning'); setView('map'); }
  };

  const takeLootItem = (e, index) => {
    e.stopPropagation();
    if (inventory.length >= getMaxInventory()) { addLog('Lo zaino è pieno!', 'danger'); return; }
    
    const itemObj = pendingLoot.items[index];
    const name = safeName(itemObj);
    setInventory(prev => [...prev, itemObj]);

    const itemInfo = safeItem(name);
    const xpGained = RARITY[itemInfo.rarity]?.xp || 0;
    if(xpGained > 0) { setXp(prev => prev + xpGained); addLog(`✨ +${xpGained} XP`, 'success'); } 

    const newLoot = [...pendingLoot.items]; newLoot.splice(index, 1);
    if (newLoot.length === 0) { setPendingLoot(null); setView('map'); } 
    else { setPendingLoot({ ...pendingLoot, items: newLoot }); }
  };

  const takeAllLoot = () => {
    let spaceLeft = getMaxInventory() - inventory.length;
    if (spaceLeft <= 0) { addLog('Lo zaino è pieno!', 'danger'); return; }
    
    let itemsToTake = pendingLoot.items.slice(0, spaceLeft);
    let itemsLeft = pendingLoot.items.slice(spaceLeft);
    let xpGained = 0;
    
    itemsToTake.forEach(itemObj => { 
      const itemInfo = safeItem(safeName(itemObj));
      xpGained += RARITY[itemInfo.rarity]?.xp || 0; 
    });

    setInventory(prev => [...prev, ...itemsToTake]);
    if(xpGained > 0) { setXp(prev => prev + xpGained); addLog(`✨ +${xpGained} XP totali`, 'success'); }

    if (itemsLeft.length === 0) { setPendingLoot(null); setView('map'); addLog('Hai svuotato la zona.', 'info'); } 
    else { setPendingLoot({ ...pendingLoot, items: itemsLeft }); addLog('Zaino pieno!', 'warning'); }
  };

  const handleTravelClick = (loc) => {
    chiudiPopup();
    if (energy < loc.cost) { addLog(`Energia insufficiente.`, 'warning'); return; }
    if (inventory.length >= getMaxInventory() && loc.type !== 'safe') { addLog('Inventario pieno.', 'warning'); return; }
    
    if (loc.reqKey && !inventory.some(i => safeName(i) === loc.reqKey) && !stash.some(i => safeName(i) === loc.reqKey)) {
        addLog(`🔒 ACCESSO NEGATO. Richiesta: ${loc.reqKey}`, 'danger'); return;
    }
    if (loc.reqRad && getRadProtect() < loc.reqRad) {
        addLog(`☣️ RADIAZIONI LETALI! Ti serve protezione RAD ${loc.reqRad}.`, 'danger'); return;
    }

    setIsTraveling(true); setTravelTarget(loc); setSelectedLocation(null);
    setTimeout(() => { setIsTraveling(false); executeExplore(loc); }, 3000);
  };

  const executeExplore = (loc) => {
    setEnergy(prev => prev - loc.cost);
    if (loc.type === 'safe') { setView(loc.id === 'rifugio' ? 'base' : 'market'); addLog(`Sei arrivato a: ${loc.name}`, 'info'); return; }
    
    // GESTIONE ENCOUNTER GARANTITO AD ALTI LIVELLI
    let safeChance = 0;
    if (loc.lvl < 10) safeChance = 0.4;       // 40% sicuro nei primi livelli
    else if (loc.lvl < 15) safeChance = 0.15; // 15% sicuro medi livelli
    // Livelli 15+ = 0% safe chance. Nemico garantito.

    if (Math.random() < safeChance && loc.id !== 'duomo' && loc.id !== 'linate') { 
        addLog(`Zona esplorata in sicurezza.`, 'success'); 
        generateAndShowLoot(loc); 
        return; 
    }

    const enemyName = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    const enemyData = ENEMIES_DB[enemyName] || { name: 'Mutante Sconosciuto', hp: 50, atk: 10, def: 0, desc: 'Errore Dati.' };
    setCombatState({ enemy: enemyData, hp: enemyData.hp, maxHp: enemyData.hp, location: loc });
    addLog(`⚠️ MINACCIA: ${enemyData.name}!`, 'danger');
  };

  const combatAttack = () => {
    if (!combatState || isEnemyTurn) return;
    setIsEnemyTurn(true);

    let pDmg = Math.max(1, getAtk() + Math.floor(Math.random()*10) - (combatState.enemy.def || 0));
    let newEnemyHp = combatState.hp - pDmg;
    addLog(`💥 Danno inflitto: ${pDmg}!`, 'info');
    
    if (equipped.weapon) damageEquipment('weapon', Math.floor(Math.random() * 5) + 1);

    if (newEnemyHp <= 0) {
        const xpGained = Math.floor((combatState.maxHp || 10) / 2);
        addLog(`🏆 Nemico eliminato!`, 'success');
        setXp(prev => prev + xpGained);
        setIsEnemyTurn(false); setCombatState(null); generateAndShowLoot(combatState.location); 
    } else {
        setCombatState(prev => ({...prev, hp: newEnemyHp}));
        const enemyName = combatState.enemy.name; const enemyAtk = combatState.enemy.atk || 10;
        setTimeout(() => {
            let eDmg = Math.max(1, enemyAtk + Math.floor(Math.random()*10) - getDef());
            setHp(prevHp => {
                const nextHp = Math.max(0, prevHp - eDmg);
                if (nextHp <= 0) setDeathReason(`Ucciso da un ${enemyName}.`);
                return nextHp;
            });
            addLog(`🩸 ${enemyName} colpisce per ${eDmg} danni.`, 'danger');
            
            const armorSlots = ['helmet', 'chest', 'pants', 'shoes'].filter(slot => equipped[slot]);
            if (armorSlots.length > 0) {
                const randomSlot = armorSlots[Math.floor(Math.random() * armorSlots.length)];
                damageEquipment(randomSlot, Math.floor(Math.random() * 8) + 2);
            }
            setIsEnemyTurn(false);
        }, 600); 
    }
  };

  const combatHeal = () => {
    if (!combatState || isEnemyTurn) return;
    const healIndex = inventory.findIndex(i => {
      const name = safeName(i);
      return safeItem(name).type === 'medical' || safeItem(name).type === 'consumable';
    });
    if (healIndex === -1) { addLog('❌ Nessun oggetto curativo rapido!', 'warning'); return; }
    
    setIsEnemyTurn(true);
    const itemInfo = safeItem(safeName(inventory[healIndex]));
    setHp(prev => Math.min(currentMaxHp, prev + (itemInfo.heal || 0)));
    let newInv = [...inventory]; newInv.splice(healIndex, 1); setInventory(newInv);
    addLog(`🩹 Curato ${itemInfo.heal || 0} HP.`, 'success');
    
    const enemyName = combatState.enemy.name; const enemyAtk = combatState.enemy.atk || 10;
    setTimeout(() => {
        let eDmg = Math.max(1, enemyAtk + Math.floor(Math.random()*10) - getDef());
        setHp(prevHp => {
            const nextHp = Math.max(0, prevHp - eDmg);
            if (nextHp <= 0) setDeathReason(`Ucciso da un ${enemyName}.`);
            return nextHp;
        });
        addLog(`🩸 ${enemyName} colpisce per ${eDmg} danni.`, 'danger');
        setIsEnemyTurn(false);
    }, 600); 
  };

  const combatFlee = () => {
      if (isEnemyTurn) return;
      if (energy >= 15) { setEnergy(prev => prev - 15); addLog('🏃 Fuga riuscita.', 'warning'); setCombatState(null); setView('map'); } 
      else { addLog('❌ Troppo stanco per fuggire!', 'danger'); }
  };

  const rest = () => {
    chiudiPopup();
    let hasFood = stash.some(i => safeName(i) === 'Razione K'); 
    let hasWater = stash.some(i => safeName(i) === 'Acqua Purificata');
    let dmg = 0; let newStash = [...stash];

    if (hasFood) { newStash.splice(newStash.findIndex(i => safeName(i) === 'Razione K'), 1); addLog('Razione consumata.', 'success'); } else { dmg += 20; addLog('Fame estrema (-20 HP).', 'danger'); }
    if (hasWater) { newStash.splice(newStash.findIndex(i => safeName(i) === 'Acqua Purificata'), 1); addLog('Acqua consumata.', 'success'); } else { dmg += 20; addLog('Sete estrema (-20 HP).', 'danger'); }

    setStash(newStash); setDay(prev => prev + 1); setEnergy(MAX_ENERGY);

    if (dmg > 0) {
      setHp(prev => { const nextHp = prev - dmg; if (nextHp <= 0) setDeathReason("Morto di stenti nel rifugio."); return nextHp; });
    } else {
      setHp(prev => Math.min(currentMaxHp, prev + 30)); addLog('Riposo completato. HP recuperati.', 'info');
    }
    addLog(`--- GIORNO ${day + 1} ---`, 'warning');
  };

  const restartGame = () => {
    setLevel(1); setXp(0); setHp(100); setEnergy(MAX_ENERGY); setCredits(100); setDay(1); setShelterLevel(1);
    setInventory([createItemObj('Acqua Purificata'), createItemObj('Razione K'), createItemObj('Bende')]);
    setStash([createItemObj('Acqua Purificata'), createItemObj('Razione K'), createItemObj('Rottami')]);
    setEquipped({ helmet: createItemObj('Berretto di Lana'), chest: createItemObj('Giacca Casual'), pants: createItemObj('Jeans Strappati'), shoes: createItemObj('Scarpe da Ginnastica'), weapon: createItemObj('Coltellino'), backpack: createItemObj('Sacca Sportiva') });
    setLogs([{ text: 'Nuova partita iniziata.', type: 'info' }]);
    setCombatState(null); setPendingLoot(null); chiudiPopup();
    setGameOver(false); setGameState('playing'); setView('equipment');
  };

  // --- DOWNLOAD / UPLOAD DATI ---
  const downloadSave = () => {
    const saveData = { level, xp, hp, energy, credits, day, shelterLevel, equipped, inventory, stash, logs };
    const blob = new Blob([JSON.stringify(saveData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `MilanoAnnoZero_Day${day}.json`;
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    addLog('Dati salvati su disco esterno.', 'success');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (data.level) {
            setLevel(data.level); setXp(data.xp); setHp(data.hp); setEnergy(data.energy);
            setCredits(data.credits); setDay(data.day); setShelterLevel(data.shelterLevel || 1);
            setEquipped(data.equipped); setInventory(data.inventory); setStash(data.stash); 
            setLogs(data.logs); setGameState('playing'); setView('base');
            addLog('Salvataggio caricato con successo.', 'success');
        } else { setLoadError('File non compatibile.'); setTimeout(() => setLoadError(''), 3000); }
      } catch (err) { setLoadError('Errore di lettura.'); setTimeout(() => setLoadError(''), 3000); }
    };
    reader.readAsText(file);
  };

  // ==========================================
  // RENDER GRAFICO
  // ==========================================
  if (gameState === 'start' && !gameOver) {
    return (
      <div className="min-h-screen bg-[#121312] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1b1b] via-[#121312] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
        <div className="z-10 text-center flex flex-col items-center animate-fadeIn">
          <Skull className="w-24 h-24 text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          <h1 className="text-5xl sm:text-6xl font-black text-stone-100 uppercase tracking-widest mb-1 drop-shadow-lg">Milano</h1>
          <h2 className="text-3xl sm:text-4xl font-black text-red-600 uppercase tracking-widest mb-12 drop-shadow-md">Anno Zero</h2>
          {loadError && <div className="text-red-500 font-bold mb-4 animate-pulse bg-red-950/50 px-4 py-2 rounded border border-red-800">{loadError}</div>}
          <div className="flex flex-col gap-4 w-64">
            <button onClick={() => setGameState('playing')} className="w-full py-4 bg-gradient-to-b from-[#2c3d26] to-[#1a2416] border-2 border-[#445b3c] text-stone-200 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_#11180e] active:translate-y-1 active:shadow-none hover:brightness-110 transition-all">Continua</button>
            <label className="w-full py-4 bg-gradient-to-b from-[#1c2b3d] to-[#0f172a] border-2 border-[#3e5a7d] text-stone-200 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_#020617] active:translate-y-1 active:shadow-none hover:brightness-110 transition-all cursor-pointer flex justify-center items-center">
              <ArchiveRestore className="w-5 h-5 mr-2"/> Carica Salvataggio
              <input type="file" accept=".json" className="hidden" onChange={handleFileUpload} />
            </label>
            <button onClick={restartGame} className="w-full py-4 bg-[#1a1d1b] border-2 border-[#2d312f] text-stone-400 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_#0a0b0a] active:translate-y-1 active:shadow-none hover:text-stone-200 hover:border-[#3e4340] transition-all">Nuova Partita</button>
          </div>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-[#121312] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1b1b] via-[#121312] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
        <div className="w-full max-w-md bg-[#1e211f] border-2 border-red-900 p-8 rounded-xl text-center shadow-[0_0_50px_rgba(220,38,38,0.2)] relative z-10 animate-fadeIn">
          <Skull className="w-24 h-24 text-red-600 mx-auto mb-4 animate-pulse drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          <h1 className="text-5xl font-black text-stone-100 mb-2 uppercase tracking-widest">Sei Morto</h1>
          <p className="text-stone-400 mb-6 text-sm italic">"{deathReason}"</p>
          <div className="bg-[#141615] p-4 rounded-lg mb-6 text-left space-y-2 border border-[#2d312f] text-xs font-mono">
            <p className="flex justify-between text-stone-400"><span>GIORNI SOPRAVVISSUTI</span> <span className="text-white font-bold">{day}</span></p>
            <p className="flex justify-between text-stone-400"><span>LIVELLO RAGGIUNTO</span> <span className="text-amber-500 font-bold">{level}</span></p>
          </div>
          <button onClick={restartGame} className="w-full py-4 bg-gradient-to-b from-red-800 to-red-950 border border-red-700 text-stone-200 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_#4a0a0a] active:translate-y-1 active:shadow-none hover:brightness-110 transition-all flex items-center justify-center space-x-2">
            <ArchiveRestore className="w-5 h-5" /> <span>Crea Nuovo Clone</span>
          </button>
        </div>
      </div>
    );
  }

  if (isTraveling && travelTarget) {
    return (
      <div className="min-h-screen bg-[#121312] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans animate-fadeIn">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1c221e] via-[#121312] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
        <div className="z-10 text-center flex flex-col items-center w-full max-w-sm">
          <Map className="w-16 h-16 text-stone-600 mb-6 animate-pulse" />
          <p className="text-stone-500 font-mono text-[10px] uppercase tracking-widest mb-2">In viaggio verso le coordinate</p>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-100 uppercase tracking-widest mb-10">{travelTarget.name}</h2>
          <div className="w-full h-2 bg-[#1a1d1b] rounded-full overflow-hidden border border-[#2d312f] shadow-inner">
             <div className="h-full bg-green-600 animate-[loadingBar_3s_ease-in-out_forwards]"></div>
          </div>
        </div>
        <style dangerouslySetInnerHTML={{__html: `@keyframes loadingBar { 0% { width: 0%; } 100% { width: 100%; } }`}} />
      </div>
    );
  }

  const CustomImageRenderer = ({ itemData, itemName, isEnemy = false }) => {
    const [imgError, setImgError] = useState(false);
    if (!itemData && !isEnemy) return null;
    const customUrl = isEnemy ? CUSTOM_ENEMIES_IMAGES[itemName] : CUSTOM_IMAGES[itemName];
    const IconComponent = isEnemy ? Skull : (itemData?.iconType || Package);

    if (customUrl && customUrl.trim() !== '' && !imgError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden transition-transform duration-300">
          <img src={customUrl} alt={itemName} className={`${isEnemy ? 'w-[100%] h-[100%]' : 'w-[130%] h-[130%]'} object-cover max-w-none pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]`} onError={() => setImgError(true)} loading="lazy" />
        </div>
      );
    }
    return (
      <div className={`absolute inset-0 flex items-center justify-center opacity-30 transition-all duration-300`}>
         <IconComponent strokeWidth={1.5} className={`${isEnemy ? 'w-16 h-16 text-red-500' : 'w-1/2 h-1/2 text-stone-500'} drop-shadow-md`} />
      </div>
    );
  };

  const InventoryGrid = ({ items, maxSlots, onSelect, context }) => {
    const gridItems = [];
    for (let i = 0; i < maxSlots; i++) {
      const itemObj = items[i];
      if (itemObj) {
        const name = safeName(itemObj);
        const itemData = safeItem(name);
        const rColor = RARITY[itemData?.rarity]?.color || 'text-stone-300';
        const rBorder = RARITY[itemData?.rarity]?.border || 'border-stone-500';
        const isSelected = selectedItem?.index === i && selectedItem?.context === context;

        gridItems.push(
          <div key={`${context}-${itemObj.id || i}`} onClick={(e) => { e.stopPropagation(); if (onSelect) onSelect(e, itemObj, i, context); }}
            className={`aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer transition-all border relative overflow-hidden group ${isSelected ? `border-white z-10 bg-[#3a3f3b]` : `${rBorder} bg-gradient-to-br from-[#2a2e2b] to-[#1f221f] hover:brightness-125`}`}
            style={{ boxShadow: isSelected ? `inset 0 0 15px ${RARITY[itemData?.rarity]?.shadow || 'transparent'}` : `inset 0 4px 6px rgba(0,0,0,0.6)` }}
          >
            <CustomImageRenderer itemData={itemData} itemName={name} />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent pt-5 pb-1 px-1 z-20">
              <span className={`text-[9px] text-center leading-tight line-clamp-1 font-bold block ${rColor}`}>{name}</span>
            </div>
            {itemObj.dura !== null && itemObj.dura !== undefined && (
              <div className="absolute top-1 left-1 right-1 h-1 bg-black/60 rounded-full overflow-hidden z-20">
                 <div className={`h-full ${itemObj.dura > 50 ? 'bg-green-500' : itemObj.dura > 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${itemObj.dura}%`}}></div>
              </div>
            )}
          </div>
        );
      } else {
        gridItems.push(
          <div key={`${context}-empty-${i}`} className="aspect-square bg-[#1b1d1b] border border-[#141615] rounded-md flex items-center justify-center shadow-[inset_0_4px_6px_rgba(0,0,0,0.8)] relative">
             <div className="w-1.5 h-1.5 rounded-full bg-stone-800/40 shadow-inner"></div>
          </div>
        );
      }
    }
    return (
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 bg-[#161816] rounded-lg border border-[#232624] shadow-inner">
        {gridItems}
      </div>
    );
  };

  return (
    <div className="min-h-screen text-stone-300 font-sans flex flex-col h-screen overflow-hidden selection:bg-stone-700 bg-[#121312] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#232724] via-[#131514] to-[#0a0a0a] opacity-80 pointer-events-none z-0"></div>

      {selectedItem && (
        <div className="fixed inset-0 z-50" onClick={chiudiPopup}>
          <div className="fixed z-50 w-[280px] bg-gradient-to-b from-[#2a2e2b] to-[#1f221f] border border-[#4a504d] rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden"
               style={{ top: `${popupPos.top}px`, left: `${popupPos.left}px`, transform: 'translateX(-50%)' }} onClick={e => e.stopPropagation()}>
            <div className="p-3 border-b border-[#141615] bg-[#232624] flex justify-between items-center">
               <div className="flex-1">
                 <h4 className="font-black text-sm text-stone-100 uppercase tracking-widest leading-tight">{selectedItem.name}</h4>
                 <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${RARITY[selectedItem.data?.rarity]?.color}`}>{RARITY[selectedItem.data?.rarity]?.name}</p>
               </div>
               <div className="w-12 h-12 bg-[#1b1d1b] rounded border border-[#141615] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] relative overflow-hidden flex-shrink-0 ml-2">
                 <CustomImageRenderer itemData={selectedItem.data} itemName={selectedItem.name} />
               </div>
            </div>
            
            <div className="p-2 bg-[#1b1d1b]">
               <p className="text-[11px] text-stone-400 italic mb-2 leading-tight">"{selectedItem.data?.desc}"</p>
               {selectedItem.obj?.dura !== null && selectedItem.obj?.dura !== undefined && (
                 <div className="mb-2">
                    <span className="text-[9px] text-stone-500 uppercase tracking-widest block mb-1">Durabilità: {selectedItem.obj.dura}%</span>
                    <div className="w-full h-1.5 bg-black rounded-full overflow-hidden"><div className={`h-full ${selectedItem.obj.dura > 50 ? 'bg-green-500' : selectedItem.obj.dura > 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${selectedItem.obj.dura}%`}}></div></div>
                 </div>
               )}
               <div className="flex flex-wrap gap-1.5 text-[10px] font-bold font-mono mt-2">
                  <span className="bg-[#111] px-2 py-1 rounded text-amber-500 border border-[#222] flex items-center"><Coins className="w-3 h-3 mr-1"/>{selectedItem.data?.value || 0}</span>
                  {selectedItem.data?.atk && <span className="bg-[#111] px-2 py-1 rounded text-red-500 border border-[#222] flex items-center"><Crosshair className="w-3 h-3 mr-1"/>+{selectedItem.data.atk}</span>}
                  {selectedItem.data?.def && <span className="bg-[#111] px-2 py-1 rounded text-blue-500 border border-[#222] flex items-center"><Shield className="w-3 h-3 mr-1"/>+{selectedItem.data.def}</span>}
                  {selectedItem.data?.radProtect && <span className="bg-[#111] px-2 py-1 rounded text-green-400 border border-[#222] flex items-center"><AlertTriangle className="w-3 h-3 mr-1"/>RAD +{selectedItem.data.radProtect}</span>}
                  {selectedItem.data?.heal && <span className="bg-[#111] px-2 py-1 rounded text-green-500 border border-[#222] flex items-center"><PlusSquare className="w-3 h-3 mr-1"/>+{selectedItem.data.heal}</span>}
                  {selectedItem.data?.slots && <span className="bg-[#111] px-2 py-1 rounded text-stone-300 border border-[#222] flex items-center"><Backpack className="w-3 h-3 mr-1"/>{selectedItem.data.slots} Slt</span>}
               </div>
            </div>

            <div className="flex bg-[#141615] p-1.5 gap-1.5">
              {selectedItem.context === 'inventory' && view === 'equipment' && ['weapon', 'helmet', 'chest', 'pants', 'shoes', 'backpack'].includes(selectedItem.data?.type) && (
                <button onClick={equipItem} className="flex-1 bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-stone-100 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#1a2416] active:translate-y-0.5 active:shadow-none">Equipaggia</button>
              )}
              {selectedItem.context === 'inventory' && ['medical', 'consumable'].includes(selectedItem.data?.type) && (
                <button onClick={useItem} className="flex-1 bg-gradient-to-b from-[#2c405a] to-[#1c2b3d] border border-[#3e5a7d] text-stone-100 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#111a26] active:translate-y-0.5 active:shadow-none">Usa Oggetto</button>
              )}
              {selectedItem.context === 'inventory' && view === 'base' && (
                <button onClick={() => moveItem(inventory, setInventory, stash, setStash, selectedItem.index, 100)} className="flex-1 bg-gradient-to-b from-[#3a3f3c] to-[#252826] border border-[#4d5450] text-stone-300 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#141615] active:translate-y-0.5 active:shadow-none">Deposita</button>
              )}
              {selectedItem.context === 'stash' && view === 'base' && (
                <button onClick={() => moveItem(stash, setStash, inventory, setInventory, selectedItem.index, getMaxInventory())} className="flex-1 bg-gradient-to-b from-[#3a3f3c] to-[#252826] border border-[#4d5450] text-stone-300 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#141615] active:translate-y-0.5 active:shadow-none">Prendi</button>
              )}
              {selectedItem.context === 'inventory' && view === 'market' && marketTab === 'sell' && (
                <button onClick={sellItem} className="flex-1 bg-gradient-to-b from-[#6b401e] to-[#452912] border border-[#8f5628] text-stone-100 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#2b180a] active:translate-y-0.5 active:shadow-none flex justify-center items-center">
                  Vendi <Coins className="w-3 h-3 ml-1.5"/>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="bg-[#141615]/90 backdrop-blur-sm border-b border-[#232624] p-3 shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-10 flex-shrink-0 relative">
        <div className="max-w-6xl mx-auto flex flex-col gap-2">
          <div className="flex items-center space-x-3 w-full">
            <div className="flex items-center bg-[#0a0a0a] px-2 py-1 rounded border border-[#2d312f] shadow-inner">
               <Star className="w-3 h-3 text-amber-400 mr-1.5" />
               <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">LVL {level}</span>
            </div>
            <div className="relative flex-1 h-3 bg-[#0a0a0a] border border-[#2d312f] rounded overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
              <div className="absolute h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-300" style={{ width: `${(xp / (level * 100)) * 100}%` }}></div>
              <div className="absolute w-full text-center text-[8px] font-black tracking-widest text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)] flex items-center justify-center h-full z-10">
                 XP {xp} / {level * 100}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-2">
              <div className="relative w-24 sm:w-32 h-5 bg-[#0a0a0a] border border-[#2d312f] rounded overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="absolute h-full bg-gradient-to-b from-red-500 to-red-700 transition-all duration-300" style={{ width: `${(hp / currentMaxHp) * 100}%` }}></div>
                <div className="absolute w-full text-center text-[9px] font-black tracking-widest text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)] flex items-center justify-center h-full z-10">
                   <Heart className="w-2.5 h-2.5 mr-1"/> {hp} / {currentMaxHp}
                </div>
              </div>
              <div className="relative w-16 sm:w-24 h-5 bg-[#0a0a0a] border border-[#2d312f] rounded overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)]">
                <div className="absolute h-full bg-gradient-to-b from-blue-400 to-blue-600 transition-all duration-300" style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}></div>
                <div className="absolute w-full text-center text-[9px] font-black tracking-widest text-white drop-shadow-[0_1px_1px_rgba(0,0,0,1)] flex items-center justify-center h-full z-10">
                  <Zap className="w-2.5 h-2.5 mr-1"/> {energy}
                </div>
              </div>
              {getRadProtect() > 0 && (
                <div className="flex items-center bg-[#0a0a0a] px-2 py-0.5 rounded border border-green-800 text-[10px] shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                  <AlertTriangle className="w-3 h-3 text-green-500 mr-1" />
                  <span className="font-mono font-bold text-green-400">RAD {getRadProtect()}</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
               <div className="flex items-center bg-[#1a1d1b] px-2 py-0.5 rounded border border-[#2d312f] text-[10px] shadow-inner">
                 <Coins className="w-3 h-3 text-amber-500 mr-1" />
                 <span className="font-mono font-bold text-stone-200">{credits}</span>
               </div>
               <div className="text-[10px] font-mono bg-[#1a1d1b] px-2 py-0.5 rounded border border-[#2d312f] text-stone-400 shadow-inner">
                 DAY <span className="text-stone-200 font-bold ml-1">{day}</span>
               </div>
            </div>
          </div>
        </div>
      </header>

      {combatState && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="w-full max-w-sm bg-gradient-to-b from-[#2a1b1b] to-[#160d0d] border-2 border-red-900/50 rounded-lg p-5 shadow-[0_0_40px_rgba(220,38,38,0.2)] flex flex-col items-center">
            <h2 className="text-2xl font-black text-red-500 uppercase tracking-widest mb-1 drop-shadow-md">{combatState.enemy?.name || 'Nemico'}</h2>
            <p className="text-xs text-stone-400 italic mb-5 text-center">"{combatState.enemy?.desc}"</p>

            <div className="w-32 h-32 bg-[#111] border border-red-900/50 rounded-md mb-5 relative overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <CustomImageRenderer itemData={combatState.enemy} itemName={combatState.enemy?.name} isEnemy={true} />
            </div>

            <div className="w-full space-y-4 mb-6 bg-[#0a0a0a] p-4 rounded-lg border border-[#1a1111] shadow-inner">
              <div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                    <span>{combatState.enemy?.name}</span>
                    <span className="text-red-500">{combatState.hp} / {combatState.maxHp}</span>
                 </div>
                 <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-300" style={{ width: `${(combatState.hp / (combatState.maxHp || 1)) * 100}%` }}></div>
                 </div>
              </div>
              <div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                    <span>I tuoi HP</span>
                    <span className="text-green-500">{hp} / {currentMaxHp}</span>
                 </div>
                 <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-green-800 to-green-500 transition-all duration-300" style={{ width: `${(hp / currentMaxHp) * 100}%` }}></div>
                 </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 w-full">
               <button onClick={combatAttack} disabled={isEnemyTurn} className={`flex flex-col items-center justify-center bg-gradient-to-b from-red-800 to-red-950 border border-red-700 text-stone-200 py-3 rounded font-black text-[10px] uppercase tracking-widest shadow-[0_2px_0_#4a0a0a] transition-all ${isEnemyTurn ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-0.5 active:shadow-none'}`}>
                  <Crosshair className="w-5 h-5 mb-1" /> Fuoco
               </button>
               <button onClick={combatHeal} disabled={isEnemyTurn} className={`flex flex-col items-center justify-center bg-gradient-to-b from-blue-800 to-blue-950 border border-blue-700 text-stone-200 py-3 rounded font-black text-[10px] uppercase tracking-widest shadow-[0_2px_0_#0a1e4a] transition-all ${isEnemyTurn ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-0.5 active:shadow-none'}`}>
                  <PlusSquare className="w-5 h-5 mb-1" /> Cura
               </button>
               <button onClick={combatFlee} disabled={isEnemyTurn} className={`flex flex-col items-center justify-center bg-gradient-to-b from-stone-700 to-stone-900 border border-stone-600 text-stone-300 py-3 rounded font-black text-[10px] uppercase tracking-widest shadow-[0_2px_0_#1c1917] transition-all ${isEnemyTurn ? 'opacity-50 cursor-not-allowed' : 'active:translate-y-0.5 active:shadow-none'}`}>
                  <Activity className="w-5 h-5 mb-1" /> Ritirata
               </button>
            </div>
          </div>
        </div>
      )}

      {pendingLoot && !combatState && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="w-full max-w-md bg-[#1e211f] border border-[#3e4340] rounded-xl p-5 shadow-2xl flex flex-col">
            <h2 className="text-xl font-black text-stone-100 uppercase tracking-widest mb-1 flex items-center">
              <Package className="w-6 h-6 mr-2 text-amber-500" /> Cassa di Scorte
            </h2>
            <p className="text-xs text-stone-400 mb-4">Seleziona gli oggetti per metterli nello zaino.</p>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-4 bg-[#141615] p-3 rounded-lg border border-[#2d312f] shadow-inner max-h-[40vh] overflow-y-auto custom-scrollbar">
              {pendingLoot.items.map((itemObj, idx) => {
                const name = safeName(itemObj);
                const itemData = safeItem(name);
                const rColor = RARITY[itemData?.rarity]?.color || 'text-stone-300';
                const rBorder = RARITY[itemData?.rarity]?.border || 'border-stone-500';
                return (
                  <div key={idx} onClick={(e) => takeLootItem(e, idx)}
                    className={`aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer transition-all border relative overflow-hidden group ${rBorder} bg-gradient-to-br from-[#2a2e2b] to-[#1f221f] hover:brightness-125 hover:scale-105`}
                    style={{ boxShadow: `inset 0 0 10px ${RARITY[itemData?.rarity]?.shadow || 'transparent'}` }}
                  >
                    <CustomImageRenderer itemData={itemData} itemName={name} />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent pt-4 pb-1 px-1 z-20">
                      <span className={`text-[8px] sm:text-[9px] text-center leading-tight line-clamp-1 font-bold block ${rColor}`}>{name}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="flex gap-2 mt-auto">
              <button onClick={takeAllLoot} className="flex-1 bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-stone-100 text-xs py-3 rounded-lg font-black uppercase tracking-widest shadow-[0_3px_0_#1a2416] active:translate-y-1 active:shadow-none">Prendi Tutto</button>
              <button onClick={() => {setPendingLoot(null); setView('map');}} className="flex-1 bg-gradient-to-b from-[#3a3f3c] to-[#252826] border border-[#4d5450] text-stone-300 text-xs py-3 rounded-lg font-black uppercase tracking-widest shadow-[0_3px_0_#141615] active:translate-y-1 active:shadow-none">Lascia Zona</button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full flex flex-col md:flex-row overflow-hidden relative z-10">
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          <div className="flex bg-[#161816] border-b border-[#232624] flex-shrink-0 shadow-md">
            {['equipment', 'map', 'base', 'market'].map((tab) => (
              <button key={tab} onClick={() => {setView(tab); chiudiPopup();}} 
                className={`flex-1 py-3 border-b-2 flex flex-col items-center justify-center transition-colors ${
                  view === tab ? 'border-amber-500 text-amber-500 bg-[#1c1e1d]' : 'border-transparent text-stone-500 hover:bg-[#1a1d1b] hover:text-stone-400'
                }`}
              >
                {tab === 'equipment' && <User className="w-4 h-4 mb-1" />}
                {tab === 'map' && <MapPin className="w-4 h-4 mb-1" />}
                {tab === 'base' && <Home className="w-4 h-4 mb-1" />}
                {tab === 'market' && <ShoppingCart className="w-4 h-4 mb-1" />}
                <span className="text-[9px] font-black uppercase tracking-widest">
                  {tab === 'equipment' ? 'Equip' : tab === 'base' ? 'Rifugio' : tab}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-2 sm:p-4 custom-scrollbar relative" onClick={chiudiPopup}>
            
            {view === 'map' && (
              <div className="h-full min-h-[400px] w-full bg-[#111] rounded-lg border border-[#232624] relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
                <iframe 
                  className="absolute inset-0 w-full h-full opacity-40 mix-blend-screen"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=9.130,45.434,9.250,45.494&layer=mapnik" 
                  style={{ border: 'none', pointerEvents: 'none', filter: 'invert(1) grayscale(1) contrast(1.5)' }}
                ></iframe>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(45,49,47,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(45,49,47,0.3)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
                
                {LOCATIONS.map(loc => (
                  <button 
                    key={loc.id} onClick={(e) => { e.stopPropagation(); setSelectedLocation(loc); chiudiPopup(); }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center border transition-all hover:scale-110 cursor-pointer ${
                      loc.type === 'safe' ? 'bg-[#152e1c]/80 border-green-600 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 
                      loc.lvl > 15 ? 'bg-[#3d1616]/80 border-red-600 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]' : 'bg-[#3b2710]/80 border-amber-600 text-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]'
                    }`}
                    style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                  >
                    {loc.lvl > 15 && <div className="absolute inset-0 rounded-full border border-red-500 opacity-40 animate-ping pointer-events-none"></div>}
                    {loc.type === 'safe' ? <Home className="w-4 h-4 relative z-10" /> : <AlertTriangle className="w-4 h-4 relative z-10" />}
                  </button>
                ))}

                {selectedLocation && !combatState && !pendingLoot && !isTraveling && (
                  <div className="absolute bottom-3 left-3 right-3 bg-gradient-to-b from-[#252826] to-[#1c1e1d] border border-[#3e4340] rounded-md p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-20 animate-slideUp">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-black text-lg text-stone-100 uppercase tracking-widest">{selectedLocation.name}</h3>
                      <button onClick={() => setSelectedLocation(null)} className="text-stone-500 hover:text-stone-300">✕</button>
                    </div>
                    <p className="text-[11px] text-stone-400 mb-4 italic">"{selectedLocation.desc}"</p>
                    
                    <div className="flex justify-between items-center mb-4 text-[10px] font-mono bg-[#141615] p-2 rounded border border-[#232624] shadow-inner">
                      <span className={selectedLocation.type === 'safe' ? 'text-green-500' : 'text-red-500'}>
                        {selectedLocation.type === 'safe' ? 'ZONA SICURA' : `MINACCIA LVL ${selectedLocation.lvl}`}
                      </span>
                      <span className="flex items-center text-amber-500"><Zap className="w-3 h-3 mr-1"/> COSTO: {selectedLocation.cost}</span>
                    </div>

                    <button onClick={() => handleTravelClick(selectedLocation)} className={`w-full py-3 rounded font-black tracking-widest uppercase text-[10px] ${energy >= selectedLocation.cost ? 'bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-white shadow-[0_2px_0_#1a2416] active:translate-y-0.5 active:shadow-none' : 'bg-[#232624] border border-[#2d312f] text-stone-600 cursor-not-allowed'}`}>
                      {selectedLocation.type === 'safe' ? 'Raggiungi' : 'Inizia Esplorazione'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {view === 'equipment' && (
              <div className="flex flex-col lg:flex-row gap-3 h-full">
                <div className="w-full lg:w-[35%] flex flex-col gap-3">
                  <div className="flex gap-2">
                    <div className="flex-1 bg-gradient-to-b from-[#232624] to-[#1c1e1d] p-2 rounded-md border border-[#3e4340] flex flex-col items-center justify-center shadow-md">
                      <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Difesa</span>
                      <span className="text-xl font-black text-blue-400 flex items-center"><Shield className="w-4 h-4 mr-1 opacity-50"/>{getDef()}</span>
                    </div>
                    <div className="flex-1 bg-gradient-to-b from-[#232624] to-[#1c1e1d] p-2 rounded-md border border-[#3e4340] flex flex-col items-center justify-center shadow-md">
                      <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Attacco</span>
                      <span className="text-xl font-black text-red-500 flex items-center"><Crosshair className="w-4 h-4 mr-1 opacity-50"/>{getAtk()}</span>
                    </div>
                  </div>

                  <div className="relative flex-1 min-h-[300px] flex flex-col items-center justify-center py-4 bg-[#1c1e1d] rounded-md border border-[#2d312f] shadow-[inset_0_0_20px_rgba(0,0,0,0.6)]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none"><User className="w-3/4 h-3/4 text-white" /></div>
                    <div className="grid grid-cols-3 gap-2 w-full relative z-10 px-2 sm:px-4">
                      <div className="flex flex-col gap-4 items-end justify-center">
                        <EquipSlot type="weapon" itemObj={equipped.weapon} onUnequip={(e) => { e.stopPropagation(); unequipItem('weapon'); }} label="Arma" />
                        <div className="h-8"></div>
                        <EquipSlot type="backpack" itemObj={equipped.backpack} onUnequip={(e) => { e.stopPropagation(); unequipItem('backpack'); }} label="Zaino" />
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <EquipSlot type="helmet" itemObj={equipped.helmet} onUnequip={(e) => { e.stopPropagation(); unequipItem('helmet'); }} label="Testa" />
                        <EquipSlot type="chest" itemObj={equipped.chest} onUnequip={(e) => { e.stopPropagation(); unequipItem('chest'); }} label="Busto" />
                        <EquipSlot type="pants" itemObj={equipped.pants} onUnequip={(e) => { e.stopPropagation(); unequipItem('pants'); }} label="Gambe" />
                        <EquipSlot type="shoes" itemObj={equipped.shoes} onUnequip={(e) => { e.stopPropagation(); unequipItem('shoes'); }} label="Piedi" />
                      </div>
                      <div className="flex flex-col gap-2 items-start justify-center"></div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-[65%] flex flex-col bg-[#1c1e1d] border border-[#2d312f] rounded-md p-3 shadow-md">
                  <div className="flex justify-between items-center mb-3 border-b border-[#2d312f] pb-2">
                    <h3 className="text-xs font-black text-stone-300 uppercase tracking-widest flex items-center"><Backpack className="w-4 h-4 mr-2 text-stone-500" /> Zaino</h3>
                    <span className="text-[10px] font-mono bg-[#111] px-2 py-1 rounded border border-[#232624] text-stone-400 shadow-inner">
                      {inventory.length}/{getMaxInventory()}
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 relative">
                    <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                  </div>
                </div>
              </div>
            )}

            {view === 'base' && (
              <div className="flex flex-col lg:flex-row gap-3 h-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  <div className="bg-[#1c1e1d] p-5 rounded-md border border-[#2d312f] text-center flex-1 flex flex-col justify-center items-center shadow-md relative overflow-hidden">
                    <div className="absolute top-2 right-2 bg-[#111] border border-[#3e4340] text-amber-500 text-[9px] font-black px-2 py-1 rounded">LVL {shelterLevel}</div>
                    <Home className="w-10 h-10 text-green-600 mb-2 opacity-80" />
                    <h2 className="text-base font-black text-stone-200 uppercase tracking-widest mb-1">Rifugio</h2>
                    <p className="text-[#888] text-[10px] mb-4">Costo: 1 Razione + 1 Acqua.</p>
                    
                    <button onClick={rest} className="w-full bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-white text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#1a2416] active:translate-y-0.5 active:shadow-none flex items-center justify-center mb-2">
                      <Coffee className="w-4 h-4 mr-2" /> Riposa
                    </button>
                    <button onClick={downloadSave} className="w-full bg-gradient-to-b from-blue-800 to-blue-950 border border-blue-700 text-stone-200 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#0a1e4a] active:translate-y-0.5 active:shadow-none flex items-center justify-center mb-4">
                      <ArchiveRestore className="w-4 h-4 mr-2" /> Salva su File
                    </button>

                    <div className="w-full pt-3 border-t border-[#2d312f]">
                      <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2">Migliora Struttura</h3>
                      {shelterLevel === 1 && <p className="text-[9px] text-[#888] mb-2">Costo: 10 Legno, 5 Chiodi</p>}
                      {shelterLevel === 2 && <p className="text-[9px] text-[#888] mb-2">Costo: 20 Legno, 15 Chiodi, 10 Mattoni</p>}
                      {shelterLevel === 3 && <p className="text-[9px] text-[#888] mb-2">Costo: 30 Mattoni, 10 Tubi d'Acciaio</p>}
                      {shelterLevel >= 4 && <p className="text-[9px] text-green-500 font-bold mb-2">Rifugio al Massimo!</p>}
                      
                      <button onClick={upgradeShelter} disabled={shelterLevel >= 4} className={`w-full py-2 rounded font-black uppercase tracking-widest text-[9px] flex items-center justify-center ${shelterLevel >= 4 ? 'bg-[#111] text-stone-600 border border-[#232624] cursor-not-allowed' : 'bg-gradient-to-b from-amber-700 to-amber-900 border border-amber-600 text-stone-100 shadow-[0_2px_0_#4a2a0a] active:translate-y-0.5 active:shadow-none'}`}>
                        <Hammer className="w-3 h-3 mr-2" /> Up: Cassa {getMaxStash()} Slot
                      </button>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-3">
                  <div className="bg-[#1c1e1d] rounded-md p-3 border border-[#2d312f] flex-1 flex flex-col shadow-md">
                    <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 border-b border-[#2d312f] pb-1">Zaino Attuale</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                      <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                    </div>
                  </div>
                  <div className="bg-[#1c1e1d] rounded-md p-3 border border-[#2d312f] flex-[1.5] flex flex-col shadow-md">
                    <div className="flex justify-between items-center mb-2 border-b border-[#2d312f] pb-1">
                      <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Cassa Sicura</h3>
                      <span className="text-[9px] font-mono text-stone-500 bg-[#111] px-1.5 py-0.5 rounded">{stash.length}/{getMaxStash()}</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative">
                       <InventoryGrid items={stash} maxSlots={Math.max(20, Math.ceil(stash.length/5)*5 + 5)} onSelect={handleItemAction} context="stash" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'market' && (
              <div className="flex flex-col gap-3 h-full overflow-y-auto custom-scrollbar pr-2">
                <div className="flex gap-2">
                  <button onClick={() => setMarketTab('sell')} className={`flex-1 py-3 rounded font-black text-[10px] uppercase tracking-widest transition-all ${marketTab === 'sell' ? 'bg-gradient-to-b from-[#6b401e] to-[#452912] border border-[#8f5628] text-white shadow-[0_2px_0_#2b180a]' : 'bg-[#1c1e1d] border border-[#2d312f] text-stone-500'}`}>
                    Vendi Scorte
                  </button>
                  <button onClick={() => setMarketTab('buy')} className={`flex-1 py-3 rounded font-black text-[10px] uppercase tracking-widest transition-all ${marketTab === 'buy' ? 'bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-white shadow-[0_2px_0_#1a2416]' : 'bg-[#1c1e1d] border border-[#2d312f] text-stone-500'}`}>
                    Mercato Nero
                  </button>
                </div>

                <div className="bg-[#111] p-3 rounded border border-[#232624] shadow-inner flex justify-between items-center">
                  <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest mb-1">Saldo Attuale</span>
                  <span className="text-xl font-black text-amber-500 flex items-center"><Coins className="w-5 h-5 mr-2 opacity-80"/>{credits}</span>
                </div>

                {marketTab === 'sell' && (
                  <div className="bg-[#1c1e1d] rounded-md p-3 border border-[#2d312f] shadow-md">
                    <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 border-b border-[#2d312f] pb-1">Seleziona per vendere</h3>
                    <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                  </div>
                )}

                {marketTab === 'buy' && (
                  <div className="flex flex-col gap-3">
                    <div className="bg-gradient-to-r from-[#1c1e1d] to-[#161816] rounded-md p-4 border border-stone-600 shadow-md flex justify-between items-center">
                      <div>
                         <h4 className="text-stone-300 font-black uppercase tracking-widest text-sm">Cassa di Scorte Base</h4>
                         <p className="text-[10px] text-stone-500 font-mono mt-1">Garantito 1 ogg. COMUNE/RARO.</p>
                      </div>
                      <button onClick={() => buyLootbox('base')} className="bg-[#1a1d1b] hover:bg-[#232624] border border-[#3e4340] text-amber-500 px-4 py-3 rounded font-black text-xs shadow-[0_2px_0_#0a0a0a] active:translate-y-0.5 flex items-center">
                         100 <Coins className="w-3 h-3 ml-1.5"/>
                      </button>
                    </div>

                    <div className="bg-gradient-to-r from-[#211e29] to-[#161816] rounded-md p-4 border border-blue-800 shadow-md flex justify-between items-center">
                      <div>
                         <h4 className="text-blue-400 font-black uppercase tracking-widest text-sm drop-shadow-md">Cassa Tattica</h4>
                         <p className="text-[10px] text-stone-500 font-mono mt-1">1 ogg. RARO/EPICO/LEGGENDA.</p>
                      </div>
                      <button onClick={() => buyLootbox('tattica')} className="bg-[#1a1d1b] hover:bg-[#232624] border border-[#3e4340] text-amber-500 px-4 py-3 rounded font-black text-xs shadow-[0_2px_0_#0a0a0a] active:translate-y-0.5 flex items-center">
                         300 <Coins className="w-3 h-3 ml-1.5"/>
                      </button>
                    </div>

                    <div className="bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-[#111] rounded-md p-4 border border-red-900 shadow-[0_0_15px_rgba(220,38,38,0.1)] flex justify-between items-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent pointer-events-none"></div>
                      <div className="relative z-10">
                         <h4 className="text-red-500 font-black uppercase tracking-widest text-sm drop-shadow-[0_0_5px_rgba(220,38,38,0.5)]">Cassa Militare Nera</h4>
                         <p className="text-[10px] text-stone-500 font-mono mt-1">Armi/Armature LEGGENDA/MITICO.</p>
                      </div>
                      <button onClick={() => buyLootbox('nera')} className="relative z-10 bg-red-950 hover:bg-red-900 border border-red-700 text-amber-400 px-4 py-3 rounded font-black text-xs shadow-[0_2px_0_#4a0a0a] active:translate-y-0.5 flex items-center">
                         1000 <Coins className="w-3 h-3 ml-1.5"/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>

        <div className="w-full md:w-56 lg:w-64 bg-[#111] border-l border-[#2d312f] flex flex-col flex-shrink-0 h-32 md:h-auto font-mono text-[9px] shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] z-20">
          <div className="bg-[#1c1e1d] text-stone-500 p-2 border-b border-[#2d312f] flex justify-between items-center tracking-widest uppercase font-bold">
            <span>Terminal</span>
            <span className="flex items-center"><span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse mr-1.5"></span> ACTV</span>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {logs.map((log, index) => {
              let color = 'text-[#888]';
              if (log.type === 'danger') color = 'text-red-500 font-bold';
              if (log.type === 'success') color = 'text-green-500';
              if (log.type === 'warning') color = 'text-amber-500 italic';
              if (log.type === 'info') color = 'text-stone-300';
              return (
                <div key={index} className={`${color} leading-tight break-words`}>
                  <span className="opacity-40 mr-1 text-stone-600">{'>'}</span>{log.text}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>
        </div>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #3e4340; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #5a635e; }
        .animate-slideUp { animation: slideUp 0.15s ease-out forwards; }
        .animate-fadeIn { animation: fadeIn 0.15s ease-out forwards; }
        @keyframes slideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}} />
    </div>
  );

  function EquipSlot({ type, itemObj, onUnequip, label }) {
    if (itemObj) {
      const name = safeName(itemObj);
      const data = safeItem(name);
      if (!data || data.type === 'resource') return null; 
      
      const rColor = RARITY[data.rarity]?.color || 'text-stone-300';
      const rBorder = RARITY[data.rarity]?.border || 'border-stone-500';
      return (
        <div className="flex flex-col items-center">
          <div onClick={onUnequip} 
               className={`w-14 h-14 sm:w-16 sm:h-16 bg-[#2a2e2b] border ${rBorder} rounded-md flex items-center justify-center cursor-pointer hover:brightness-110 transition-all relative group overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}
               style={{ boxShadow: `inset 0 0 15px ${RARITY[data.rarity]?.shadow || 'transparent'}` }}>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <CustomImageRenderer itemData={data} itemName={name} />
            </div>
            
            {itemObj.dura !== null && itemObj.dura !== undefined && (
              <div className="absolute top-1 left-1 right-1 h-1 bg-black/60 rounded-full overflow-hidden z-20">
                 <div className={`h-full ${itemObj.dura > 50 ? 'bg-green-500' : itemObj.dura > 25 ? 'bg-amber-500' : 'bg-red-500'}`} style={{width: `${itemObj.dura}%`}}></div>
              </div>
            )}

            <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
              <span className="text-[8px] font-black text-white uppercase tracking-widest">Togli</span>
            </div>
          </div>
          <span className={`text-[8px] sm:text-[9px] mt-1.5 font-bold uppercase tracking-widest ${rColor}`}>{label}</span>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#161816] border border-[#2d312f] border-dashed rounded-md flex flex-col items-center justify-center opacity-50 shadow-[inset_0_4px_6px_rgba(0,0,0,0.8)]">
           {type === 'weapon' && <Crosshair className="w-5 h-5 text-stone-600" />}
           {type === 'backpack' && <Backpack className="w-5 h-5 text-stone-600" />}
           {type === 'helmet' && <Shield className="w-5 h-5 text-stone-600" />}
           {type === 'chest' && <Shirt className="w-5 h-5 text-stone-600" />}
           {type === 'pants' && <Scissors className="w-5 h-5 text-stone-600" />}
           {type === 'shoes' && <User className="w-5 h-5 text-stone-600" />}
        </div>
        <span className="text-[8px] sm:text-[9px] mt-1.5 font-bold text-stone-600 uppercase tracking-widest">{label}</span>
      </div>
    );
  }
}
