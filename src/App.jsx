import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Zap, Heart, Map, Home, Backpack, Skull, AlertTriangle, 
  Package, ArchiveRestore, Coffee, PlusSquare, Crosshair, Shirt, 
  Scissors, Coins, Store, Navigation, MapPin, User, ShoppingCart, Activity, Star
} from 'lucide-react';

// ==========================================
// 🎨 SISTEMA IMMAGINI PERSONALIZZATE
// ==========================================
const CUSTOM_IMAGES = {
  // --- ARMI ---
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

  // --- ZAINI ---
  'Sacca Sportiva': 'https://i.postimg.cc/cCws9TFJ/Screenshot_20260330_142331_2.jpg',
  'Sacca a Tracolla': 'https://i.postimg.cc/cCcSVYjq/Screenshot_20260330_142331_3.jpg',
  'Zaino da Escursionismo': 'https://i.postimg.cc/T1xd7QtW/Screenshot_20260330_142331_4.jpg',
  'Zaino Tattico Militare': 'https://i.postimg.cc/h48PzWGP/Screenshot_20260330_142331_5.jpg',
  'Zaino Sopravvivenza': 'https://i.postimg.cc/D0hvj5xZ/Screenshot_20260330_142331_6.jpg', 

  // --- SET 1: CASUAL (Comune) ---
  'Berretto di Lana': 'https://i.postimg.cc/3Nh8S9tj/Screenshot_20260330_132744_2.jpg',
  'Giacca Casual': 'https://i.postimg.cc/wvLxQnQT/Screenshot_20260330_141043_5.jpg',
  'Jeans Strappati': 'https://i.postimg.cc/D0c2tsNc/Screenshot_20260330_164352_2.jpg',
  'Scarpe da Ginnastica': 'https://i.postimg.cc/L5S9Cvx5/Screenshot_20260330_141126_3.jpg',

  // --- SET 2: CIVILE PESANTE (Raro) ---
  'Casco da Lavoro': 'https://i.postimg.cc/PJMtBZ7g/Screenshot_20260330_132744_3.jpg',
  'Giubbotto di Pelle': 'https://i.postimg.cc/2yxzPvtZ/Screenshot_20260330_141043_6.jpg',
  'Pantaloni Cargo': 'https://i.postimg.cc/tJbqSDB7/Screenshot_20260330_164352_3.jpg',
  'Scarponi da Lavoro': 'https://i.postimg.cc/MHYWHRLd/Screenshot_20260330_141126_4.jpg',

  // --- SET 3: CACCIA/SOPRAVVIVENZA (Epico) ---
  'Cappello Mimetico': 'https://i.postimg.cc/T1xd7Qt9/Screenshot_20260330_132744_4.jpg',
  'Giacca da Caccia': 'https://i.postimg.cc/hvnDyM2K/Screenshot_20260330_141043_7.jpg',
  'Pantaloni da Sopravvivenza': 'https://i.postimg.cc/BbCqdDzw/Screenshot_20260330_164352_4.jpg',
  'Stivali da Trekking': 'https://i.postimg.cc/3Nh8S9t8/Screenshot_20260330_141126_5.jpg',

  // --- SET 4: ANTISOMMOSSA (Leggendario) ---
  'Casco Antisommossa': 'https://i.postimg.cc/wX5Ty8BB/Screenshot_20260330_132744_5.jpg',
  'Corazza Antisommossa': 'https://i.postimg.cc/qqGk9nFw/Screenshot_20260330_141043_8.jpg',
  'Pantaloni Antisommossa': 'https://i.postimg.cc/rsTVngfD/Screenshot_20260330_164352_5.jpg',
  'Anfibi Antisommossa': 'https://i.postimg.cc/Wz72QryH/Screenshot_20260330_141126_6.jpg',

  // --- SET 5: FORZE SPECIALI (Mitico) ---
  'Casco Tattico Visore': 'https://i.postimg.cc/x8Qfxg6y/Screenshot_20260330_132744_6.jpg',
  'Corazza Forze Speciali': 'https://i.postimg.cc/nrxFRT3x/Screenshot_20260330_141043_4.jpg',
  'Pantaloni Forze Speciali': 'https://i.postimg.cc/5ymxZvr5/Screenshot_20260330_164352_6.jpg',
  'Stivali Tattici Avanzati': 'https://i.postimg.cc/VvwfG4K0/Screenshot_20260330_141126_7.jpg',
};

const CUSTOM_ENEMIES_IMAGES = {
  'Lurker': '', 'Slasher': '', 'Rioter': '', 'Chimera': '', 'Gilbert': ''
};

// --- STILE LDOE E XP ---
const RARITY = {
  comune: { id: 'comune', color: 'text-stone-300', border: 'border-stone-500', shadow: 'rgba(120, 113, 108, 0.4)', name: 'Comune', xp: 0 },
  raro: { id: 'raro', color: 'text-blue-300', border: 'border-blue-500', shadow: 'rgba(59, 130, 246, 0.4)', name: 'Raro', xp: 15 },
  epico: { id: 'epico', color: 'text-purple-400', border: 'border-purple-500', shadow: 'rgba(168, 85, 247, 0.4)', name: 'Epico', xp: 40 },
  leggendario: { id: 'leggendario', color: 'text-amber-500', border: 'border-amber-500', shadow: 'rgba(245, 158, 11, 0.4)', name: 'Leggenda', xp: 100 },
  mitico: { id: 'mitico', color: 'text-red-500', border: 'border-red-500', shadow: 'rgba(239, 68, 68, 0.6)', name: 'Mitico', xp: 250 }
};

// --- DATABASE NEMICI ---
const ENEMIES_DB = {
  'Lurker': { name: 'Lurker', hp: 45, atk: 12, def: 2, desc: 'Mutante standard. Veloce e imprevedibile, ma debole da solo.' },
  'Slasher': { name: 'Slasher', hp: 75, atk: 28, def: 5, desc: 'Occhi rossi luminosi. Usa armi da taglio con brutalità letale.' },
  'Rioter': { name: 'Rioter', hp: 130, atk: 22, def: 18, desc: 'Ex-sicurezza mutata. L\'armatura antiproiettile assorbe molti danni.' },
  'Chimera': { name: 'Chimera', hp: 400, atk: 65, def: 35, desc: 'BOSS: Abominio genetico. Estremamente veloce, squarcia l\'armatura.' },
  'Gilbert': { name: 'Gilbert', hp: 500, atk: 85, def: 45, desc: 'BOSS: Ex-operatore d\'elite. Armato di fucile a pompa R8. Devastante a corto raggio.' }
};

// --- DATABASE OGGETTI ---
const ITEMS = {
  'Acqua Purificata': { type: 'consumable', rarity: 'comune', value: 5, heal: 0, desc: 'Idratazione essenziale.', iconType: Coffee },
  'Razione K': { type: 'consumable', rarity: 'comune', value: 8, heal: 5, desc: 'Cibo liofilizzato.', iconType: Package },
  'Bende': { type: 'medical', rarity: 'comune', value: 12, heal: 20, desc: 'Ferma le emorragie.', iconType: PlusSquare },
  'Medikit': { type: 'medical', rarity: 'raro', value: 40, heal: 60, desc: 'Kit tattico medico.', iconType: PlusSquare },
  'Rottami': { type: 'resource', rarity: 'comune', value: 2, desc: 'Metallo arrugginito.', iconType: Package },
  'Componenti Elettronici': { type: 'resource', rarity: 'raro', value: 15, desc: 'Chip e circuiti.', iconType: Zap },
  'Munizioni 9mm': { type: 'resource', rarity: 'comune', value: 10, desc: 'Proiettili leggeri.', iconType: Crosshair },
  'Munizioni 5.56': { type: 'resource', rarity: 'epico', value: 25, desc: 'Proiettili perforanti.', iconType: Crosshair },
  'Cimelio d\'Oro': { type: 'resource', rarity: 'leggendario', value: 150, desc: 'Oro puro pre-bomba.', iconType: Coins },
  'Disco Dati Governativo': { type: 'resource', rarity: 'mitico', value: 500, desc: 'Codici di sicurezza.', iconType: Package },

  'Sacca Sportiva': { type: 'backpack', rarity: 'comune', value: 20, slots: 10, desc: 'Capienza: 10 Slot', iconType: Backpack },
  'Sacca a Tracolla': { type: 'backpack', rarity: 'raro', value: 50, slots: 15, desc: 'Capienza: 15 Slot', iconType: Backpack },
  'Zaino da Escursionismo': { type: 'backpack', rarity: 'epico', value: 120, slots: 20, desc: 'Capienza: 20 Slot', iconType: Backpack },
  'Zaino Tattico Militare': { type: 'backpack', rarity: 'leggendario', value: 250, slots: 25, desc: 'Capienza: 25 Slot', iconType: Backpack },
  'Zaino Sopravvivenza': { type: 'backpack', rarity: 'mitico', value: 600, slots: 30, desc: 'Capienza: 30 Slot', iconType: Backpack },

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

  'Berretto di Lana': { type: 'helmet', rarity: 'comune', value: 5, def: 1, desc: 'Protezione minima.', iconType: Shield },
  'Giacca Casual': { type: 'chest', rarity: 'comune', value: 10, def: 3, desc: 'Tessuto leggero.', iconType: Shirt },
  'Jeans Strappati': { type: 'pants', rarity: 'comune', value: 8, def: 2, desc: 'Usurati.', iconType: Scissors },
  'Scarpe da Ginnastica': { type: 'shoes', rarity: 'comune', value: 8, def: 1, desc: 'Comode.', iconType: User },

  'Casco da Lavoro': { type: 'helmet', rarity: 'raro', value: 20, def: 4, desc: 'Plastica rigida.', iconType: Shield },
  'Giubbotto di Pelle': { type: 'chest', rarity: 'raro', value: 35, def: 8, desc: 'Evita i morsi.', iconType: Shirt },
  'Pantaloni Cargo': { type: 'pants', rarity: 'raro', value: 25, def: 5, desc: 'Resistente.', iconType: Scissors },
  'Scarponi da Lavoro': { type: 'shoes', rarity: 'raro', value: 20, def: 4, desc: 'Punta rinforzata.', iconType: User },

  'Cappello Mimetico': { type: 'helmet', rarity: 'epico', value: 45, def: 7, desc: 'Materiale tecnico.', iconType: Shield },
  'Giacca da Caccia': { type: 'chest', rarity: 'epico', value: 80, def: 14, desc: 'Isolante termico.', iconType: Shirt },
  'Pantaloni da Sopravvivenza': { type: 'pants', rarity: 'epico', value: 65, def: 11, desc: 'Kevlar.', iconType: Scissors },
  'Stivali da Trekking': { type: 'shoes', rarity: 'epico', value: 55, def: 9, desc: 'Ottima aderenza.', iconType: User },

  'Casco Antisommossa': { type: 'helmet', rarity: 'leggendario', value: 140, def: 16, desc: 'Visiera balistica.', iconType: Shield },
  'Corazza Antisommossa': { type: 'chest', rarity: 'leggendario', value: 220, def: 28, desc: 'Placche anti-urto.', iconType: Shirt },
  'Pantaloni Antisommossa': { type: 'pants', rarity: 'leggendario', value: 180, def: 22, desc: 'Snodi rinforzati.', iconType: Scissors },
  'Anfibi Antisommossa': { type: 'shoes', rarity: 'leggendario', value: 150, def: 18, desc: 'Suola rinforzata.', iconType: User },

  'Casco Tattico Visore': { type: 'helmet', rarity: 'mitico', value: 350, def: 25, desc: 'Sensori HUD.', iconType: Shield },
  'Corazza Forze Speciali': { type: 'chest', rarity: 'mitico', value: 600, def: 45, desc: 'Placche in titanio.', iconType: Shirt },
  'Pantaloni Forze Speciali': { type: 'pants', rarity: 'mitico', value: 450, def: 35, desc: 'Fibre muscolari.', iconType: Scissors },
  'Stivali Tattici Avanzati': { type: 'shoes', rarity: 'mitico', value: 400, def: 30, desc: 'Assorbimento d\'impatto.', iconType: User },
};

// --- MAPPA ---
const LOCATIONS = [
  { id: 'duomo', name: 'Cratere del Duomo', type: 'danger', x: 50, y: 50, desc: 'Ground Zero. Radiazioni estreme.', lvl: 25, cost: 40, enemies: ['Chimera'], loot: ['Disco Dati Governativo', 'Minigun Vulcan', 'Corazza Forze Speciali', 'Casco Tattico Visore', 'Zaino Sopravvivenza'], minLoot: 4, maxLoot: 6 },
  { id: 'mercato', name: 'Mercato (Cadorna)', type: 'safe', x: 37, y: 43, desc: 'Zona neutrale. Puoi scambiare oggetti.', lvl: 1, cost: 5 },
  { id: 'sempione', name: 'Foresta Sempione', type: 'danger', x: 33, y: 31, desc: 'Rovine invase dalla vegetazione.', lvl: 2, cost: 10, enemies: ['Lurker'], loot: ['Rottami', 'Acqua Purificata', 'Coltellino', 'Sacca Sportiva', 'Mazza da Baseball', 'Berretto di Lana', 'Jeans Strappati'], minLoot: 1, maxLoot: 3 },
  { id: 'caserma', name: 'Caserma Firenze', type: 'danger', x: 16, y: 15, desc: 'Avamposto militare abbandonato.', lvl: 10, cost: 20, enemies: ['Rioter', 'Slasher', 'Lurker'], loot: ['Munizioni 9mm', 'Razione K', 'Medikit', 'Pistola Glock', 'Giubbotto di Pelle', 'Mitraglietta Uzi', 'Scarponi da Lavoro'], minLoot: 2, maxLoot: 4 },
  { id: 'centrale', name: 'Stazione Centrale', type: 'danger', x: 61, y: 15, desc: 'Covo principale dei Predoni.', lvl: 18, cost: 30, enemies: ['Rioter', 'Slasher'], loot: ['Munizioni 5.56', 'Fucile AK-47', 'Fucile M16', 'Zaino Tattico Militare', 'Cimelio d\'Oro', 'Casco Antisommossa'], minLoot: 3, maxLoot: 5 },
  { id: 'rifugio', name: 'Il Tuo Rifugio', type: 'safe', x: 79, y: 26, desc: 'La tua base operativa.', lvl: 1, cost: 0 },
  { id: 'ospedale', name: 'Policlinico', type: 'danger', x: 54, y: 60, desc: 'Forniture mediche tra i corridoi.', lvl: 12, cost: 25, enemies: ['Rioter', 'Slasher', 'Lurker'], loot: ['Medikit', 'Componenti Elettronici', 'Zaino da Escursionismo', 'Pantaloni Cargo', 'MP5 Silenziato'], minLoot: 3, maxLoot: 5 },
  { id: 'navigli', name: 'Paludi Darsena', type: 'danger', x: 37, y: 70, desc: 'Fanghi tossici nei vecchi canali.', lvl: 5, cost: 15, enemies: ['Lurker', 'Slasher'], loot: ['Rottami', 'Componenti Elettronici', 'Bende', 'Mazza da Baseball', 'Scarpe da Ginnastica', 'Giacca Casual'], minLoot: 2, maxLoot: 4 },
  { id: 'bicocca', name: 'Bicocca (Rovine Uni)', type: 'danger', x: 65, y: 8, desc: 'Laboratori universitari abbandonati.', lvl: 4, cost: 12, enemies: ['Lurker', 'Slasher'], loot: ['Componenti Elettronici', 'Acqua Purificata', 'Pistola Glock', 'Jeans Strappati', 'Casco da Lavoro'], minLoot: 1, maxLoot: 3 },
  { id: 'sansiro', name: 'San Siro (Arena)', type: 'danger', x: 12, y: 38, desc: 'Lo stadio è un covo di bestie.', lvl: 8, cost: 18, enemies: ['Lurker', 'Slasher'], loot: ['Mitraglietta Uzi', 'Sacca a Tracolla', 'Bende', 'Giubbotto di Pelle', 'Pantaloni da Sopravvivenza'], minLoot: 2, maxLoot: 4 },
  { id: 'citylife', name: 'CityLife (Torri)', type: 'danger', x: 28, y: 34, desc: 'I grattacieli nascondono orrori.', lvl: 14, cost: 25, enemies: ['Rioter', 'Slasher'], loot: ['FAMAS Silenziato', 'Giacca da Caccia', 'Medikit', 'Componenti Elettronici', 'Stivali da Trekking'], minLoot: 2, maxLoot: 5 },
  { id: 'idroscalo', name: 'Idroscalo (Acque Morte)', type: 'danger', x: 92, y: 65, desc: 'Il mare di Milano, ora palude letale.', lvl: 20, cost: 35, enemies: ['Rioter', 'Slasher'], loot: ['AK-47 Tamburo', 'Pistola Tamburo', 'Munizioni 5.56', 'Corazza Antisommossa', 'Pantaloni Antisommossa'], minLoot: 3, maxLoot: 5 },
  { id: 'linate', name: 'Linate (Aeroporto)', type: 'danger', x: 88, y: 80, desc: 'Pieno di armamenti ma super sorvegliato.', lvl: 28, cost: 45, enemies: ['Gilbert'], loot: ['Mitragliatrice M249', 'Corazza Forze Speciali', 'Pantaloni Forze Speciali', 'Stivali Tattici Avanzati'], minLoot: 4, maxLoot: 6 }
];

const MAX_ENERGY = 100;
const BASE_ATK = 5;
const BASE_DEF = 0;

export default function App() {
  const [gameState, setGameState] = useState('start');
  const [view, setView] = useState('equipment');
  const [level, setLevel] = useState(1);
  const [xp, setXp] = useState(0);
  const currentMaxHp = 100 + (level - 1) * 10; 
  const [hp, setHp] = useState(currentMaxHp);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [credits, setCredits] = useState(100);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [deathReason, setDeathReason] = useState('');
  
  const [equipped, setEquipped] = useState({
    helmet: 'Berretto di Lana', chest: 'Giacca Casual', pants: 'Jeans Strappati', shoes: 'Scarpe da Ginnastica', weapon: 'Pistola Glock', backpack: 'Sacca Sportiva'
  });

  const [inventory, setInventory] = useState(['Acqua Purificata', 'Razione K', 'Bende']); 
  const [stash, setStash] = useState(['Acqua Purificata', 'Razione K', 'Rottami']); 
  
  const [logs, setLogs] = useState([{ text: 'Stazione operativa. Cerca risorse e sopravvivi.', type: 'info' }]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const [selectedItem, setSelectedItem] = useState(null);
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 });
  const [combatState, setCombatState] = useState(null);
  const [pendingLoot, setPendingLoot] = useState(null);
  
  const [isTraveling, setIsTraveling] = useState(false);
  const [travelTarget, setTravelTarget] = useState(null);
  const [isEnemyTurn, setIsEnemyTurn] = useState(false);

  const logEndRef = useRef(null);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  // CONTROLLO DI MORTE (ATTENZIONE: Questo è il blocco che mancava per mostrare il Game Over!)
  useEffect(() => { 
    if (hp <= 0 && !gameOver) {
      setGameOver(true);
      setCombatState(null);
      setPendingLoot(null);
    }
  }, [hp, gameOver]);

  // Gestione Level Up
  useEffect(() => {
    const requiredXp = level * 100;
    if (xp >= requiredXp) {
      setLevel(prev => prev + 1);
      setXp(prev => prev - requiredXp);
      setHp(100 + (level) * 10); 
      setEnergy(MAX_ENERGY);
      addLog(`⬆️ LIVELLO ${level + 1}! HP Massimi aumentati. Salute ed Energia ripristinate.`, 'success');
    }
  }, [xp, level]);

  const getMaxInventory = () => equipped.backpack ? ITEMS[equipped.backpack].slots : 5;
  const getAtk = () => BASE_ATK + (equipped.weapon ? ITEMS[equipped.weapon].atk : 0);
  const getDef = () => BASE_DEF + 
    (equipped.helmet ? ITEMS[equipped.helmet].def : 0) +
    (equipped.chest ? ITEMS[equipped.chest].def : 0) +
    (equipped.pants ? ITEMS[equipped.pants].def : 0) +
    (equipped.shoes ? ITEMS[equipped.shoes].def : 0);

  const addLog = (text, type = 'info') => setLogs(prev => [...prev, { text, type }]);

  const handleItemAction = (e, itemStr, index, context) => {
    e.stopPropagation();
    if (!itemStr) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const widgetWidth = 280;
    const widgetHeight = 230; 
    
    let calcLeft = rect.left + rect.width / 2;
    let calcTop = rect.bottom + 8; 

    if (calcLeft - widgetWidth / 2 < 10) calcLeft = widgetWidth / 2 + 10;
    if (calcLeft + widgetWidth / 2 > window.innerWidth - 10) calcLeft = window.innerWidth - widgetWidth / 2 - 10;

    if (calcTop + widgetHeight > window.innerHeight) {
        calcTop = rect.top - widgetHeight - 8;
        if (calcTop < 10) calcTop = window.innerHeight / 2 - widgetHeight / 2; 
    }

    setPopupPos({ top: calcTop, left: calcLeft });
    setSelectedItem({ name: itemStr, index, context, data: ITEMS[itemStr] });
  };

  const chiudiPopup = () => setSelectedItem(null);

  const equipItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    if (data.type === 'backpack' && inventory.length - 1 > data.slots) { addLog('Svuota lo zaino prima di cambiarlo!', 'warning'); chiudiPopup(); return; }

    let currentEquipped = equipped[data.type];
    let newInventory = [...inventory];
    newInventory.splice(index, 1);
    if (currentEquipped) newInventory.push(currentEquipped);
    
    setInventory(newInventory); setEquipped(prev => ({ ...prev, [data.type]: name }));
    addLog(`Equipaggiato: ${name}`, 'success'); chiudiPopup();
  };

  const unequipItem = (type) => {
    const itemName = equipped[type];
    if (!itemName) return;
    if (type === 'backpack') { addLog('Sostituisci lo zaino con un altro.', 'warning'); chiudiPopup(); return; }
    if (inventory.length >= getMaxInventory()) { addLog('Inventario pieno.', 'warning'); chiudiPopup(); return; }

    setEquipped(prev => ({ ...prev, [type]: null })); setInventory(prev => [...prev, itemName]);
    addLog(`Rimosso: ${itemName}`, 'info'); chiudiPopup();
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
    const item = fromArray[index]; const newFrom = [...fromArray]; newFrom.splice(index, 1);
    setFromArray(newFrom); setToArray(prev => [...prev, item]); chiudiPopup();
  };

  const sellItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    setCredits(prev => prev + data.value);
    let newInv = [...inventory]; newInv.splice(index, 1); setInventory(newInv);
    addLog(`Venduto ${name} (+${data.value} ¢)`, 'success'); chiudiPopup();
  };

  const generateAndShowLoot = (loc) => {
    const numItems = Math.floor(Math.random() * (loc.maxLoot - loc.minLoot + 1)) + loc.minLoot;
    let found = [];
    let uniqueEquipmentFound = new Set(); 

    for (let i = 0; i < numItems; i++) {
      let attempts = 0; let finalItem = null;
      while (attempts < 15) {
        let candidate = loc.loot[Math.floor(Math.random() * loc.loot.length)];
        let candidateType = ITEMS[candidate].type;
        if (!['weapon', 'helmet', 'chest', 'pants', 'shoes', 'backpack'].includes(candidateType)) { finalItem = candidate; break; }
        if (!found.includes(candidate) && !uniqueEquipmentFound.has(candidate)) {
          finalItem = candidate; uniqueEquipmentFound.add(candidate); break;
        }
        attempts++;
      }
      if (finalItem) found.push(finalItem); 
    }
    
    if (found.length > 0) {
      setPendingLoot({ items: found, location: loc });
    } else {
      addLog('Zona perquisita, non hai trovato nulla.', 'warning');
      setView('map');
    }
  };

  const takeLootItem = (e, index) => {
    e.stopPropagation();
    if (inventory.length >= getMaxInventory()) { addLog('Lo zaino è pieno!', 'danger'); return; }
    
    const itemStr = pendingLoot.items[index];
    setInventory(prev => [...prev, itemStr]);

    const xpGained = RARITY[ITEMS[itemStr].rarity].xp;
    if(xpGained > 0) {
       setXp(prev => prev + xpGained);
       addLog(`✨ +${xpGained} XP (${itemStr})`, 'success');
    } else {
       addLog(`Preso: ${itemStr}`, 'info');
    }

    const newLoot = [...pendingLoot.items];
    newLoot.splice(index, 1);
    
    if (newLoot.length === 0) {
      setPendingLoot(null);
      setView('map');
    } else {
      setPendingLoot({ ...pendingLoot, items: newLoot });
    }
  };

  const takeAllLoot = () => {
    let spaceLeft = getMaxInventory() - inventory.length;
    if (spaceLeft <= 0) { addLog('Lo zaino è pieno!', 'danger'); return; }
    
    let itemsToTake = pendingLoot.items.slice(0, spaceLeft);
    let itemsLeft = pendingLoot.items.slice(spaceLeft);
    let xpGained = 0;

    itemsToTake.forEach(item => { xpGained += RARITY[ITEMS[item].rarity].xp; });

    setInventory(prev => [...prev, ...itemsToTake]);
    if(xpGained > 0) {
        setXp(prev => prev + xpGained);
        addLog(`✨ +${xpGained} XP totali dai ritrovamenti!`, 'success');
    }

    if (itemsLeft.length === 0) {
        setPendingLoot(null);
        setView('map');
        addLog('Hai svuotato la zona.', 'info');
    } else {
        setPendingLoot({ ...pendingLoot, items: itemsLeft });
        addLog('Zaino pieno! Alcuni oggetti sono stati lasciati.', 'warning');
    }
  };

  const handleTravelClick = (loc) => {
    chiudiPopup();
    if (energy < loc.cost) { addLog(`Energia insufficiente.`, 'warning'); return; }
    if (inventory.length >= getMaxInventory() && loc.type !== 'safe') { addLog('Inventario pieno. Svuotalo prima.', 'warning'); return; }
    
    setIsTraveling(true);
    setTravelTarget(loc);
    setSelectedLocation(null);

    setTimeout(() => {
      setIsTraveling(false);
      executeExplore(loc);
    }, 3000);
  };

  const executeExplore = (loc) => {
    setEnergy(prev => prev - loc.cost);
    
    if (loc.type === 'safe') {
      setView(loc.id === 'rifugio' ? 'base' : 'market');
      addLog(`Sei arrivato a: ${loc.name}`, 'info');
      return;
    }

    if (loc.id !== 'duomo' && loc.id !== 'linate' && Math.random() > 0.5) {
        addLog(`Esplorazione sicura, nessun nemico in zona.`, 'success');
        generateAndShowLoot(loc);
        return;
    }

    const enemyName = loc.enemies[Math.floor(Math.random() * loc.enemies.length)];
    const enemyData = ENEMIES_DB[enemyName];

    setCombatState({ enemy: enemyData, hp: enemyData.hp, maxHp: enemyData.hp, location: loc });
    addLog(`⚠️ MINACCIA RILEVATA: ${enemyData.name}!`, 'danger');
  };

  const combatAttack = () => {
    if (!combatState || isEnemyTurn) return;
    setIsEnemyTurn(true);

    let pDmg = Math.max(1, getAtk() + Math.floor(Math.random()*10) - combatState.enemy.def);
    let newEnemyHp = combatState.hp - pDmg;
    addLog(`💥 Danno inflitto: ${pDmg}!`, 'info');

    if (newEnemyHp <= 0) {
        const xpGained = Math.floor(combatState.maxHp / 2);
        addLog(`🏆 Nemico eliminato!`, 'success');
        setXp(prev => prev + xpGained);
        addLog(`✨ +${xpGained} XP per l'uccisione.`, 'success');
        
        setIsEnemyTurn(false);
        setCombatState(null);
        generateAndShowLoot(combatState.location); 
    } else {
        setCombatState(prev => ({...prev, hp: newEnemyHp}));
        
        const enemyName = combatState.enemy.name;
        const enemyAtk = combatState.enemy.atk;
        const locName = combatState.location.name;
        const playerDef = getDef();

        setTimeout(() => {
            let eDmg = Math.max(1, enemyAtk + Math.floor(Math.random()*10) - playerDef);
            setHp(prevHp => {
                const nextHp = Math.max(0, prevHp - eDmg);
                if (nextHp <= 0) setDeathReason(`Ucciso da un ${enemyName} a ${locName}.`);
                return nextHp;
            });
            addLog(`🩸 ${enemyName} colpisce per ${eDmg} danni.`, 'danger');
            setIsEnemyTurn(false);
        }, 600); 
    }
  };

  const combatHeal = () => {
    if (!combatState || isEnemyTurn) return;
    
    const healIndex = inventory.findIndex(i => ITEMS[i].type === 'medical' || ITEMS[i].type === 'consumable');
    if (healIndex === -1) { addLog('❌ Nessun oggetto curativo rapido nello zaino!', 'warning'); return; }
    
    setIsEnemyTurn(true);
    
    const item = ITEMS[inventory[healIndex]];
    setHp(prev => Math.min(currentMaxHp, prev + item.heal));
    
    let newInv = [...inventory]; newInv.splice(healIndex, 1); setInventory(newInv);
    addLog(`🩹 Curato ${item.heal} HP.`, 'success');
    
    const enemyName = combatState.enemy.name;
    const enemyAtk = combatState.enemy.atk;
    const locName = combatState.location.name;
    const playerDef = getDef();

    setTimeout(() => {
        let eDmg = Math.max(1, enemyAtk + Math.floor(Math.random()*10) - playerDef);
        setHp(prevHp => {
            const nextHp = Math.max(0, prevHp - eDmg);
            if (nextHp <= 0) setDeathReason(`Ucciso da un ${enemyName} a ${locName}.`);
            return nextHp;
        });
        addLog(`🩸 ${enemyName} colpisce per ${eDmg} danni.`, 'danger');
        setIsEnemyTurn(false);
    }, 600); 
  };

  const combatFlee = () => {
      if (isEnemyTurn) return;
      if (energy >= 15) {
          setEnergy(prev => prev - 15);
          addLog('🏃 Fuga riuscita (-15 Energia).', 'warning');
          setCombatState(null);
          setView('map');
      } else { addLog('❌ Troppo stanco per fuggire!', 'danger'); }
  };

  const rest = () => {
    chiudiPopup();
    let hasFood = stash.includes('Razione K');
    let hasWater = stash.includes('Acqua Purificata');
    let dmg = 0; let newStash = [...stash];

    if (hasFood) { newStash.splice(newStash.indexOf('Razione K'), 1); addLog('Razione consumata.', 'success'); } 
    else { dmg += 20; addLog('Fame estrema (-20 HP).', 'danger'); }

    if (hasWater) { newStash.splice(newStash.indexOf('Acqua Purificata'), 1); addLog('Acqua consumata.', 'success'); } 
    else { dmg += 20; addLog('Sete estrema (-20 HP).', 'danger'); }

    setStash(newStash); setDay(prev => prev + 1); setEnergy(MAX_ENERGY);

    if (dmg > 0) {
      // FIX PER LA MORTE NEL RIFUGIO: calcoliamo il danno in modo sicuro
      setHp(prev => {
        const nextHp = prev - dmg;
        if (nextHp <= 0) setDeathReason("Morto di stenti nel rifugio.");
        return nextHp;
      });
    } else {
      setHp(prev => Math.min(currentMaxHp, prev + 30));
      addLog('Riposo completato. HP recuperati.', 'info');
    }
    addLog(`--- GIORNO ${day + 1} ---`, 'warning');
  };

  const restartGame = () => {
    setLevel(1); setXp(0);
    setHp(100); setEnergy(MAX_ENERGY); setCredits(100); setDay(1);
    setInventory(['Acqua Purificata', 'Razione K', 'Bende']);
    setStash(['Acqua Purificata', 'Razione K', 'Rottami']);
    setEquipped({ helmet: 'Berretto di Lana', chest: 'Giacca Casual', pants: 'Jeans Strappati', shoes: 'Scarpe da Ginnastica', weapon: 'Pistola Glock', backpack: 'Sacca Sportiva' });
    setLogs([{ text: 'Nuova partita iniziata.', type: 'info' }]);
    setCombatState(null); setPendingLoot(null); chiudiPopup();
    setGameOver(false); setGameState('playing'); setView('equipment');
  };

  // ==========================================
  // RENDER COMPONENTI GRAFICI
  // ==========================================
  
  if (gameState === 'start' && !gameOver) {
    return (
      <div className="min-h-screen bg-[#121312] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a1b1b] via-[#121312] to-[#0a0a0a] opacity-80 pointer-events-none"></div>
        <div className="z-10 text-center flex flex-col items-center animate-fadeIn">
          <Skull className="w-24 h-24 text-red-600 mb-6 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          <h1 className="text-5xl sm:text-6xl font-black text-stone-100 uppercase tracking-widest mb-1 drop-shadow-lg">Milano</h1>
          <h2 className="text-3xl sm:text-4xl font-black text-red-600 uppercase tracking-widest mb-12 drop-shadow-md">Anno Zero</h2>
          
          <div className="flex flex-col gap-4 w-64">
            <button onClick={() => setGameState('playing')} className="w-full py-4 bg-gradient-to-b from-[#2c3d26] to-[#1a2416] border-2 border-[#445b3c] text-stone-200 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_#11180e] active:translate-y-1 active:shadow-none hover:brightness-110 transition-all">
              Continua
            </button>
            <button onClick={restartGame} className="w-full py-4 bg-[#1a1d1b] border-2 border-[#2d312f] text-stone-400 font-black uppercase tracking-widest rounded-lg shadow-[0_4px_0_#0a0b0a] active:translate-y-1 active:shadow-none hover:text-stone-200 hover:border-[#3e4340] transition-all">
              Nuova Partita
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- SCHERMATA DI GAME OVER ---
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
          <p className="text-stone-600 font-mono text-[9px] uppercase tracking-widest mt-4">Analisi del perimetro in corso...</p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `@keyframes loadingBar { 0% { width: 0%; } 100% { width: 100%; } }`}} />
      </div>
    );
  }

  const CustomImageRenderer = ({ itemData, itemName, isEnemy = false, sizeClass = "w-10 h-10 sm:w-12 sm:h-12" }) => {
    const [imgError, setImgError] = useState(false);
    if (!itemData) return null;
    
    const customUrl = isEnemy ? CUSTOM_ENEMIES_IMAGES[itemName] : CUSTOM_IMAGES[itemName];
    const IconComponent = isEnemy ? Skull : (itemData.iconType || Package);

    if (customUrl && customUrl.trim() !== '' && !imgError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden transition-transform duration-300">
          <img src={customUrl} alt={itemName} 
               className={`${isEnemy ? 'w-[100%] h-[100%]' : 'w-[130%] h-[130%]'} object-cover max-w-none pointer-events-none drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]`}
               onError={() => setImgError(true)} loading="lazy" />
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
      const itemStr = items[i];
      if (itemStr) {
        const itemData = ITEMS[itemStr];
        const rColor = RARITY[itemData.rarity].color;
        const rBorder = RARITY[itemData.rarity].border;
        const isSelected = selectedItem?.index === i && selectedItem?.context === context;

        gridItems.push(
          <div key={`${context}-${i}`} onClick={(e) => { e.stopPropagation(); if (onSelect) onSelect(e, itemStr, i, context); }}
            className={`aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer transition-all border relative overflow-hidden group
              ${isSelected ? `border-white z-10 bg-[#3a3f3b]` : `${rBorder} bg-gradient-to-br from-[#2a2e2b] to-[#1f221f] hover:brightness-125`}`}
            style={{ boxShadow: isSelected ? `inset 0 0 15px ${RARITY[itemData.rarity].shadow}` : `inset 0 4px 6px rgba(0,0,0,0.6)` }}
          >
            <CustomImageRenderer itemData={itemData} itemName={itemStr} />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent pt-5 pb-1 px-1 z-20">
              <span className={`text-[9px] text-center leading-tight line-clamp-1 font-bold block ${rColor}`}>{itemStr}</span>
            </div>
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

      {/* WIDGET SOTTO L'OGGETTO */}
      {selectedItem && (
        <div className="fixed inset-0 z-50" onClick={chiudiPopup}>
          <div className="fixed z-50 w-[280px] bg-gradient-to-b from-[#2a2e2b] to-[#1f221f] border border-[#4a504d] rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.9)] overflow-hidden"
               style={{ top: `${popupPos.top}px`, left: `${popupPos.left}px`, transform: 'translateX(-50%)' }}
               onClick={e => e.stopPropagation()}>
            <div className="p-3 border-b border-[#141615] bg-[#232624] flex justify-between items-center">
               <div className="flex-1">
                 <h4 className="font-black text-sm text-stone-100 uppercase tracking-widest">{selectedItem.name}</h4>
                 <p className={`text-[10px] font-bold uppercase tracking-widest ${RARITY[selectedItem.data.rarity].color}`}>{RARITY[selectedItem.data.rarity].name}</p>
               </div>
               <div className="w-12 h-12 bg-[#1b1d1b] rounded border border-[#141615] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] relative overflow-hidden flex-shrink-0 ml-2">
                 <CustomImageRenderer itemData={selectedItem.data} itemName={selectedItem.name} />
               </div>
            </div>
            
            <div className="p-2 bg-[#1b1d1b]">
               <p className="text-[11px] text-stone-400 italic mb-2 leading-tight">"{selectedItem.data.desc}"</p>
               <div className="flex flex-wrap gap-1.5 text-[10px] font-bold font-mono">
                  <span className="bg-[#111] px-2 py-1 rounded text-amber-500 border border-[#222] flex items-center"><Coins className="w-3 h-3 mr-1"/>{selectedItem.data.value}</span>
                  {selectedItem.data.atk && <span className="bg-[#111] px-2 py-1 rounded text-red-500 border border-[#222] flex items-center"><Crosshair className="w-3 h-3 mr-1"/>+{selectedItem.data.atk}</span>}
                  {selectedItem.data.def && <span className="bg-[#111] px-2 py-1 rounded text-blue-500 border border-[#222] flex items-center"><Shield className="w-3 h-3 mr-1"/>+{selectedItem.data.def}</span>}
                  {selectedItem.data.heal && <span className="bg-[#111] px-2 py-1 rounded text-green-500 border border-[#222] flex items-center"><PlusSquare className="w-3 h-3 mr-1"/>+{selectedItem.data.heal}</span>}
                  {selectedItem.data.slots && <span className="bg-[#111] px-2 py-1 rounded text-stone-300 border border-[#222] flex items-center"><Backpack className="w-3 h-3 mr-1"/>{selectedItem.data.slots} Slt</span>}
               </div>
            </div>

            <div className="flex bg-[#141615] p-1.5 gap-1.5">
              {selectedItem.context === 'inventory' && view === 'equipment' && ['weapon', 'helmet', 'chest', 'pants', 'shoes', 'backpack'].includes(selectedItem.data.type) && (
                <button onClick={equipItem} className="flex-1 bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-stone-100 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#1a2416] active:translate-y-0.5 active:shadow-none">Equipaggia</button>
              )}
              {selectedItem.context === 'inventory' && ['medical', 'consumable'].includes(selectedItem.data.type) && (
                <button onClick={useItem} className="flex-1 bg-gradient-to-b from-[#2c405a] to-[#1c2b3d] border border-[#3e5a7d] text-stone-100 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#111a26] active:translate-y-0.5 active:shadow-none">Usa Oggetto</button>
              )}
              {selectedItem.context === 'inventory' && view === 'base' && (
                <button onClick={() => moveItem(inventory, setInventory, stash, setStash, selectedItem.index, 100)} className="flex-1 bg-gradient-to-b from-[#3a3f3c] to-[#252826] border border-[#4d5450] text-stone-300 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#141615] active:translate-y-0.5 active:shadow-none">Deposita</button>
              )}
              {selectedItem.context === 'stash' && view === 'base' && (
                <button onClick={() => moveItem(stash, setStash, inventory, setInventory, selectedItem.index, getMaxInventory())} className="flex-1 bg-gradient-to-b from-[#3a3f3c] to-[#252826] border border-[#4d5450] text-stone-300 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#141615] active:translate-y-0.5 active:shadow-none">Prendi</button>
              )}
              {selectedItem.context === 'inventory' && view === 'market' && (
                <button onClick={sellItem} className="flex-1 bg-gradient-to-b from-[#6b401e] to-[#452912] border border-[#8f5628] text-stone-100 text-[10px] py-2.5 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#2b180a] active:translate-y-0.5 active:shadow-none flex justify-center items-center">
                  Vendi <Coins className="w-3 h-3 ml-1.5"/>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HEADER SUPERIORE */}
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

      {/* SCHERMATA COMBATTIMENTO */}
      {combatState && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="w-full max-w-sm bg-gradient-to-b from-[#2a1b1b] to-[#160d0d] border-2 border-red-900/50 rounded-lg p-5 shadow-[0_0_40px_rgba(220,38,38,0.2)] flex flex-col items-center">
            <h2 className="text-2xl font-black text-red-500 uppercase tracking-widest mb-1 drop-shadow-md">{combatState.enemy.name}</h2>
            <p className="text-xs text-stone-400 italic mb-5 text-center">"{combatState.enemy.desc}"</p>

            <div className="w-32 h-32 bg-[#111] border border-red-900/50 rounded-md mb-5 relative overflow-hidden shadow-[inset_0_4px_10px_rgba(0,0,0,0.8)] flex items-center justify-center">
              <CustomImageRenderer itemData={combatState.enemy} itemName={combatState.enemy.name} isEnemy={true} />
            </div>

            <div className="w-full space-y-4 mb-6 bg-[#0a0a0a] p-4 rounded-lg border border-[#1a1111] shadow-inner">
              <div>
                 <div className="flex justify-between text-[10px] font-black uppercase tracking-wider text-stone-500 mb-1">
                    <span>{combatState.enemy.name}</span>
                    <span className="text-red-500">{combatState.hp} / {combatState.maxHp}</span>
                 </div>
                 <div className="w-full h-2.5 bg-[#111] rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-red-800 to-red-500 transition-all duration-300" style={{ width: `${(combatState.hp / combatState.maxHp) * 100}%` }}></div>
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

      {/* SCHERMATA DEL LOOT */}
      {pendingLoot && !combatState && (
        <div className="absolute inset-0 z-40 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-4 sm:p-8 animate-fadeIn">
          <div className="w-full max-w-md bg-[#1e211f] border border-[#3e4340] rounded-xl p-5 shadow-2xl flex flex-col">
            <h2 className="text-xl font-black text-stone-100 uppercase tracking-widest mb-1 flex items-center">
              <Package className="w-6 h-6 mr-2 text-amber-500" /> Cassa di Scorte
            </h2>
            <p className="text-xs text-stone-400 mb-4">Seleziona gli oggetti per metterli nello zaino.</p>

            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mb-4 bg-[#141615] p-3 rounded-lg border border-[#2d312f] shadow-inner max-h-[40vh] overflow-y-auto custom-scrollbar">
              {pendingLoot.items.map((itemStr, idx) => {
                const itemData = ITEMS[itemStr];
                const rColor = RARITY[itemData.rarity].color;
                const rBorder = RARITY[itemData.rarity].border;
                return (
                  <div key={idx} onClick={(e) => takeLootItem(e, idx)}
                    className={`aspect-square rounded-md flex flex-col items-center justify-center cursor-pointer transition-all border relative overflow-hidden group ${rBorder} bg-gradient-to-br from-[#2a2e2b] to-[#1f221f] hover:brightness-125 hover:scale-105`}
                    style={{ boxShadow: `inset 0 0 10px ${RARITY[itemData.rarity].shadow}` }}
                  >
                    <CustomImageRenderer itemData={itemData} itemName={itemStr} />
                    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#111] via-[#111]/80 to-transparent pt-4 pb-1 px-1 z-20">
                      <span className={`text-[8px] sm:text-[9px] text-center leading-tight line-clamp-1 font-bold block ${rColor}`}>{itemStr}</span>
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
                        <EquipSlot type="weapon" item={equipped.weapon} onUnequip={(e) => { e.stopPropagation(); unequipItem('weapon'); }} label="Arma" />
                        <div className="h-8"></div>
                        <EquipSlot type="backpack" item={equipped.backpack} onUnequip={(e) => { e.stopPropagation(); unequipItem('backpack'); }} label="Zaino" />
                      </div>
                      <div className="flex flex-col gap-2 items-center">
                        <EquipSlot type="helmet" item={equipped.helmet} onUnequip={(e) => { e.stopPropagation(); unequipItem('helmet'); }} label="Testa" />
                        <EquipSlot type="chest" item={equipped.chest} onUnequip={(e) => { e.stopPropagation(); unequipItem('chest'); }} label="Busto" />
                        <EquipSlot type="pants" item={equipped.pants} onUnequip={(e) => { e.stopPropagation(); unequipItem('pants'); }} label="Gambe" />
                        <EquipSlot type="shoes" item={equipped.shoes} onUnequip={(e) => { e.stopPropagation(); unequipItem('shoes'); }} label="Piedi" />
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
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-1 relative" onClick={chiudiPopup}>
                    <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                  </div>
                </div>
              </div>
            )}

            {view === 'base' && (
              <div className="flex flex-col lg:flex-row gap-3 h-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  <div className="bg-[#1c1e1d] p-6 rounded-md border border-[#2d312f] text-center flex-1 flex flex-col justify-center items-center shadow-md">
                    <Home className="w-12 h-12 text-green-600 mb-3 opacity-80" />
                    <h2 className="text-lg font-black text-stone-200 uppercase tracking-widest mb-1">Rifugio</h2>
                    <p className="text-[#888] text-[11px] mb-6">Costo: 1 Razione + 1 Acqua.</p>
                    <button onClick={rest} className="w-full bg-gradient-to-b from-[#445b3c] to-[#2c3d26] border border-[#5c7a52] text-white text-[10px] py-3 rounded font-black uppercase tracking-widest shadow-[0_2px_0_#1a2416] active:translate-y-0.5 active:shadow-none flex items-center justify-center">
                      <Coffee className="w-4 h-4 mr-2" /> Riposa
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-3">
                  <div className="bg-[#1c1e1d] rounded-md p-3 border border-[#2d312f] flex-1 flex flex-col shadow-md">
                    <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 border-b border-[#2d312f] pb-1">Zaino Attuale</h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative" onClick={chiudiPopup}>
                      <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                    </div>
                  </div>
                  <div className="bg-[#1c1e1d] rounded-md p-3 border border-[#2d312f] flex-[1.5] flex flex-col shadow-md">
                    <div className="flex justify-between items-center mb-2 border-b border-[#2d312f] pb-1">
                      <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Cassa Sicura</h3>
                      <span className="text-[9px] font-mono text-stone-500 bg-[#111] px-1.5 py-0.5 rounded">{stash.length}/100</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar relative" onClick={chiudiPopup}>
                       <InventoryGrid items={stash} maxSlots={Math.max(20, Math.ceil(stash.length/5)*5 + 5)} onSelect={handleItemAction} context="stash" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {view === 'market' && (
              <div className="flex flex-col lg:flex-row gap-3 h-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  <div className="bg-[#1c1e1d] p-6 rounded-md border border-[#2d312f] flex-1 flex flex-col justify-center shadow-md">
                    <Store className="w-10 h-10 text-amber-600 mb-4 opacity-80" />
                    <h2 className="text-lg font-black text-stone-200 uppercase tracking-widest mb-1">Mercante</h2>
                    <p className="text-[11px] text-[#888] mb-6">Scambio risorse per crediti.</p>
                    <div className="bg-[#111] p-3 rounded border border-[#232624] shadow-inner">
                      <span className="block text-[9px] text-stone-500 font-bold uppercase tracking-widest mb-1">Saldo</span>
                      <span className="text-2xl font-black text-amber-500 flex items-center"><Coins className="w-5 h-5 mr-2 opacity-80"/>{credits}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-2/3 bg-[#1c1e1d] rounded-md p-3 border border-[#2d312f] flex flex-col shadow-md">
                  <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-2 border-b border-[#2d312f] pb-1">Seleziona per vendere</h3>
                  <div className="flex-1 overflow-y-auto custom-scrollbar relative" onClick={chiudiPopup}>
                     <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                  </div>
                </div>
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

  function EquipSlot({ type, item, onUnequip, label }) {
    if (item) {
      const data = ITEMS[item];
      const rColor = RARITY[data.rarity].color;
      const rBorder = RARITY[data.rarity].border;
      return (
        <div className="flex flex-col items-center">
          <div onClick={onUnequip} 
               className={`w-14 h-14 sm:w-16 sm:h-16 bg-[#2a2e2b] border ${rBorder} rounded-md flex items-center justify-center cursor-pointer hover:brightness-110 transition-all relative group overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.5)]`}
               style={{ boxShadow: `inset 0 0 15px ${RARITY[data.rarity].shadow}` }}>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <CustomImageRenderer itemData={data} itemName={item} />
            </div>

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
