import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, Zap, Heart, Map, Home, Backpack, Skull, AlertTriangle, 
  ArrowRight, Package, ArchiveRestore, Coffee, PlusSquare, 
  Crosshair, Shirt, Scissors, Coins, Store, Navigation, MapPin, 
  User, Search, ShoppingCart
} from 'lucide-react';

// ==========================================
// 🎨 SISTEMA IMMAGINI PERSONALIZZATE (Postimages)
// ==========================================
// Quando avrai caricato le tue PNG su Postimages.cc, copia il "Link Diretto"
// e incollalo qui tra le virgolette. Fino ad allora, lasciale vuote ('').
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

  // --- ZAINI ---
  'Sacca Sportiva': 'https://i.postimg.cc/cCWx9TFJ/Screenshot_20260330_142331_2.jpg',
  'Sacca a Tracolla': 'https://i.postimg.cc/cCcsVYjq/Screenshot_20260330_142331_3.jpg',
  'Zaino da Escursionismo': 'https://i.postimg.cc/T1xd7QtW/Screenshot_20260330_142331_4.jpg',
  'Zaino Tattico Militare': 'https://i.postimg.cc/D0hvj5xZ/Screenshot_20260330_142331_6.jpg',
  'Zaino Sopravvivenza': 'https://i.postimg.cc/cCcsVYjq/Screenshot_20260330_142331_3.jpg',

  // --- SET 1: CASUAL (Comune) ---
  'Cappello di Lana': 'https://i.postimg.cc/3Nh8S9tj/Screenshot_20260330_132744_2.jpg',
  'Giacca Casual': 'https://i.postimg.cc/wvLxQnQT/Screenshot_20260330_141043_5.jpg',
  'Jeans Strappati': 'https://i.postimg.cc/D0c2tsNc/Screenshot_20260330_164352_2.jpg',
  'Scarpe da Ginnastica': 'https://i.postimg.cc/L5S9Cvx5/Screenshot_20260330_141126_3.jpg',

  // --- SET 2: CIVILE PESANTE (Raro) ---
  'Casco da Lavoro': 'https://i.postimg.cc/PJMtBZ7g/Screenshot_20260330_132744_3.jpg',
  'Giacca di Pelle': 'https://i.postimg.cc/2yxzPvtZ/Screenshot_20260330_141043_6.jpg',
  'Pantaloni Cargo': 'https://i.postimg.cc/tJbqSDB7/Screenshot_20260330_164352_3.jpg',
  'Scarponi da Lavoro': 'https://i.postimg.cc/MHYWhRLd/Screenshot_20260330_141126_4.jpg',

  // --- SET 3: CACCIA/SOPRAVVIVENZA (Epico) ---
  'Cappello Mimetico': '',
  'Giacca da Caccia': '',
  'Pantaloni Sopravvivenza': '',
  'Stivali da Trekking': '',

  // --- SET 4: ANTISOMMOSSA (Leggendario) ---
  'Casco Antisommossa': '',
  'Corazza Antisommossa': '',
  'Pantaloni Antisommossa': '',
  'Anfibi Antisommossa': '',

  // --- SET 5: FORZE SPECIALI (Mitico) ---
  'Casco Tattico Visore': '',
  'Corazza Forze Speciali': '',
  'Pantaloni Forze Speciali': '',
  'Stivali Tattici Avanzati': '',
};

// --- SISTEMA RARITÀ E COLORI VIBRANTI ---
const RARITY = {
  comune: { id: 'comune', color: 'text-gray-300', border: 'border-gray-600', bg: 'bg-gray-800/60', glow: 'rgba(156, 163, 175, 0.2)', name: 'Comune' },
  raro: { id: 'raro', color: 'text-blue-400', border: 'border-blue-500', bg: 'bg-blue-900/40', glow: 'rgba(59, 130, 246, 0.3)', name: 'Raro' },
  epico: { id: 'epico', color: 'text-purple-400', border: 'border-purple-500', bg: 'bg-purple-900/40', glow: 'rgba(168, 85, 247, 0.4)', name: 'Epico' },
  leggendario: { id: 'leggendario', color: 'text-orange-400', border: 'border-orange-500', bg: 'bg-orange-900/40', glow: 'rgba(249, 115, 22, 0.5)', name: 'Leggenda' },
  mitico: { id: 'mitico', color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-900/40', glow: 'rgba(239, 68, 68, 0.6)', name: 'Mitico' }
};

// --- DATABASE OGGETTI ---
const ITEMS = {
  // === RISORSE E CONSUMABILI ===
  'Acqua Purificata': { type: 'consumable', rarity: 'comune', value: 5, heal: 0, desc: 'Fondamentale per sopravvivere.', iconType: Coffee },
  'Razione K': { type: 'consumable', rarity: 'comune', value: 8, heal: 5, desc: 'Cibo in scatola militare.', iconType: Package },
  'Bende': { type: 'medical', rarity: 'comune', value: 12, heal: 20, desc: 'Cura 20 HP.', iconType: PlusSquare },
  'Medikit': { type: 'medical', rarity: 'raro', value: 40, heal: 60, desc: 'Cura 60 HP.', iconType: PlusSquare },
  'Rottami': { type: 'resource', rarity: 'comune', value: 2, desc: 'Metallo utile.', iconType: Package },
  'Componenti Elettronici': { type: 'resource', rarity: 'raro', value: 15, desc: 'Pezzi tech.', iconType: Zap },
  'Munizioni 9mm': { type: 'resource', rarity: 'comune', value: 10, desc: 'Calibro leggero.', iconType: Crosshair },
  'Munizioni 5.56': { type: 'resource', rarity: 'epico', value: 25, desc: 'Calibro pesante.', iconType: Crosshair },
  'Cimelio d\'Oro': { type: 'resource', rarity: 'leggendario', value: 150, desc: 'Oggetto prezioso pre-bomba.', iconType: Coins },
  'Disco Dati Governativo': { type: 'resource', rarity: 'mitico', value: 500, desc: 'Contiene segreti inestimabili.', iconType: Package },

  // === ZAINI ===
  'Sacca Sportiva': { type: 'backpack', rarity: 'comune', value: 20, slots: 10, desc: 'Capienza minima (10 Slot).', iconType: Backpack },
  'Sacca a Tracolla': { type: 'backpack', rarity: 'raro', value: 50, slots: 15, desc: 'Buona per iniziare (15 Slot).', iconType: Backpack },
  'Zaino da Escursionismo': { type: 'backpack', rarity: 'epico', value: 120, slots: 20, desc: 'Zaino tecnico (20 Slot).', iconType: Backpack },
  'Zaino Tattico Militare': { type: 'backpack', rarity: 'leggendario', value: 250, slots: 25, desc: 'Zaino dell\'esercito (25 Slot).', iconType: Backpack },
  'Zaino Sopravvivenza': { type: 'backpack', rarity: 'mitico', value: 600, slots: 30, desc: 'Il massimo della capienza (30 Slot).', iconType: Backpack },

  // === ARMI ===
  'Coltellino': { type: 'weapon', rarity: 'comune', value: 10, atk: 5, desc: 'Lama corta per le emergenze.', iconType: Crosshair },
  'Mazza da Baseball': { type: 'weapon', rarity: 'comune', value: 20, atk: 12, desc: 'Silenziosa e contundente.', iconType: Crosshair },
  'Pistola Glock': { type: 'weapon', rarity: 'raro', value: 80, atk: 25, desc: 'Standard 9mm. Affidabile.', iconType: Crosshair },
  'Mitraglietta Uzi': { type: 'weapon', rarity: 'raro', value: 120, atk: 35, desc: 'Alta cadenza a corto raggio.', iconType: Crosshair },
  'Fucile M16': { type: 'weapon', rarity: 'epico', value: 200, atk: 45, desc: 'Preciso dalla media distanza.', iconType: Crosshair },
  'MP5 Silenziato': { type: 'weapon', rarity: 'epico', value: 220, atk: 48, desc: 'Letale e non attira i nemici.', iconType: Crosshair },
  'Fucile AK-47': { type: 'weapon', rarity: 'leggendario', value: 300, atk: 55, desc: 'Il re dei fucili d\'assalto.', iconType: Crosshair },
  'FAMAS Silenziato': { type: 'weapon', rarity: 'leggendario', value: 350, atk: 65, desc: 'Bullpup ad alta tecnologia.', iconType: Crosshair },
  'Pistola Tamburo': { type: 'weapon', rarity: 'leggendario', value: 380, atk: 70, desc: 'Modificata per massima capienza.', iconType: Crosshair },
  'AK-47 Tamburo': { type: 'weapon', rarity: 'mitico', value: 500, atk: 85, desc: 'Variante pesante inarrestabile.', iconType: Crosshair },
  'Mitragliatrice M249': { type: 'weapon', rarity: 'mitico', value: 900, atk: 120, desc: 'Fuoco di soppressione brutale.', iconType: Crosshair },
  'Minigun Vulcan': { type: 'weapon', rarity: 'mitico', value: 1500, atk: 200, desc: 'Canna rotante. Distruzione totale.', iconType: Crosshair },

  // === ARMADURE: SET 1 - CASUAL (Comune) ===
  'Cappello di Lana': { type: 'helmet', rarity: 'comune', value: 5, def: 1, desc: 'Tiene caldo la testa.', iconType: Shield },
  'Giacca Casual': { type: 'chest', rarity: 'comune', value: 10, def: 3, desc: 'Semplice giacca da città.', iconType: Shirt },
  'Jeans Strappati': { type: 'pants', rarity: 'comune', value: 8, def: 2, desc: 'Offrono pochissima protezione.', iconType: Scissors },
  'Scarpe da Ginnastica': { type: 'shoes', rarity: 'comune', value: 8, def: 1, desc: 'Comode per fuggire velocemente.', iconType: User },

  // === ARMADURE: SET 2 - CIVILE PESANTE (Raro) ===
  'Casco da Lavoro': { type: 'helmet', rarity: 'raro', value: 20, def: 4, desc: 'Protegge dai detriti in caduta.', iconType: Shield },
  'Giacca di Pelle': { type: 'chest', rarity: 'raro', value: 35, def: 8, desc: 'Pelle spessa, ottima contro i graffi.', iconType: Shirt },
  'Pantaloni Cargo': { type: 'pants', rarity: 'raro', value: 25, def: 5, desc: 'Tessuto resistente e multitasche.', iconType: Scissors },
  'Scarponi da Lavoro': { type: 'shoes', rarity: 'raro', value: 20, def: 4, desc: 'Punta in acciaio rinforzata.', iconType: User },

  // === ARMADURE: SET 3 - CACCIA/SOPRAVVIVENZA (Epico) ===
  'Cappello Mimetico': { type: 'helmet', rarity: 'epico', value: 45, def: 7, desc: 'Mimetismo perfetto nei boschi.', iconType: Shield },
  'Giacca da Caccia': { type: 'chest', rarity: 'epico', value: 80, def: 14, desc: 'Imbottita e resistente al freddo.', iconType: Shirt },
  'Pantaloni Sopravvivenza': { type: 'pants', rarity: 'epico', value: 65, def: 11, desc: 'Materiale tecnico anti-strappo.', iconType: Scissors },
  'Stivali da Trekking': { type: 'shoes', rarity: 'epico', value: 55, def: 9, desc: 'Massima aderenza su ogni terreno.', iconType: User },

  // === ARMADURE: SET 4 - ANTISOMMOSSA (Leggendario) ===
  'Casco Antisommossa': { type: 'helmet', rarity: 'leggendario', value: 140, def: 16, desc: 'Visiera in policarbonato balistico.', iconType: Shield },
  'Corazza Antisommossa': { type: 'chest', rarity: 'leggendario', value: 220, def: 28, desc: 'Placche rigide per protezione totale.', iconType: Shirt },
  'Pantaloni Antisommossa': { type: 'pants', rarity: 'leggendario', value: 180, def: 22, desc: 'Protezioni snodate per le gambe.', iconType: Scissors },
  'Anfibi Antisommossa': { type: 'shoes', rarity: 'leggendario', value: 150, def: 18, desc: 'Pelle ignifuga e suola rinforzata.', iconType: User },

  // === ARMADURE: SET 5 - FORZE SPECIALI (Mitico) ===
  'Casco Tattico Visore': { type: 'helmet', rarity: 'mitico', value: 350, def: 25, desc: 'Include visore notturno HUD.', iconType: Shield },
  'Corazza Forze Speciali': { type: 'chest', rarity: 'mitico', value: 600, def: 45, desc: 'Kevlar intrecciato con titanio.', iconType: Shirt },
  'Pantaloni Forze Speciali': { type: 'pants', rarity: 'mitico', value: 450, def: 35, desc: 'Fibre muscolari sintetiche integrate.', iconType: Scissors },
  'Stivali Tattici Avanzati': { type: 'shoes', rarity: 'mitico', value: 400, def: 30, desc: 'Assorbono impatti da cadute estreme.', iconType: User },
};

// --- MAPPA E LUOGHI ---
const LOCATIONS = [
  { id: 'duomo', name: 'Cratere del Duomo', type: 'danger', x: 50, y: 50, desc: 'Ground Zero. Radiazioni estreme.', lvl: 25, cost: 40, enemyAtk: 120, enemyDef: 60, loot: ['Disco Dati Governativo', 'Minigun Vulcan', 'Corazza Forze Speciali', 'Casco Tattico Visore', 'Zaino Sopravvivenza'], minLoot: 4, maxLoot: 6 },
  { id: 'mercato', name: 'Mercato (Cadorna)', type: 'safe', x: 37, y: 43, desc: 'Zona neutrale. Puoi scambiare oggetti.', lvl: 1, cost: 5 },
  { id: 'sempione', name: 'Foresta Sempione', type: 'danger', x: 33, y: 31, desc: 'Rovine invase dalla vegetazione.', lvl: 2, cost: 10, enemyAtk: 10, enemyDef: 2, loot: ['Rottami', 'Acqua Purificata', 'Coltellino', 'Sacca Sportiva', 'Mazza da Baseball', 'Cappello di Lana', 'Jeans Strappati'], minLoot: 1, maxLoot: 3 },
  { id: 'caserma', name: 'Caserma Firenze', type: 'danger', x: 16, y: 15, desc: 'Avamposto militare abbandonato.', lvl: 10, cost: 20, enemyAtk: 45, enemyDef: 25, loot: ['Munizioni 9mm', 'Razione K', 'Medikit', 'Pistola Glock', 'Giubbotto Antiproiettile', 'Mitraglietta Uzi', 'Scarponi da Lavoro'], minLoot: 2, maxLoot: 4 },
  { id: 'centrale', name: 'Stazione Centrale', type: 'danger', x: 61, y: 15, desc: 'Covo principale dei Predoni.', lvl: 18, cost: 30, enemyAtk: 80, enemyDef: 40, loot: ['Munizioni 5.56', 'Fucile AK-47', 'Fucile M16', 'Zaino Tattico Militare', 'Cimelio d\'Oro', 'Casco Antisommossa'], minLoot: 3, maxLoot: 5 },
  { id: 'rifugio', name: 'Il Tuo Rifugio', type: 'safe', x: 79, y: 26, desc: 'La tua base operativa.', lvl: 1, cost: 0 },
  { id: 'ospedale', name: 'Policlinico', type: 'danger', x: 54, y: 60, desc: 'Forniture mediche tra i corridoi.', lvl: 12, cost: 25, enemyAtk: 55, enemyDef: 20, loot: ['Medikit', 'Componenti Elettronici', 'Zaino da Escursionismo', 'Pantaloni Cargo', 'MP5 Silenziato'], minLoot: 3, maxLoot: 5 },
  { id: 'navigli', name: 'Paludi Darsena', type: 'danger', x: 37, y: 70, desc: 'Fanghi tossici nei vecchi canali.', lvl: 5, cost: 15, enemyAtk: 25, enemyDef: 10, loot: ['Rottami', 'Componenti Elettronici', 'Bende', 'Mazza da Baseball', 'Scarpe da Ginnastica', 'Giacca Casual'], minLoot: 2, maxLoot: 4 },
  { id: 'bicocca', name: 'Bicocca (Rovine Uni)', type: 'danger', x: 65, y: 8, desc: 'Laboratori universitari abbandonati.', lvl: 4, cost: 12, enemyAtk: 18, enemyDef: 8, loot: ['Componenti Elettronici', 'Acqua Purificata', 'Pistola Glock', 'Jeans Strappati', 'Casco da Lavoro'], minLoot: 1, maxLoot: 3 },
  { id: 'sansiro', name: 'San Siro (Arena)', type: 'danger', x: 12, y: 38, desc: 'Lo stadio è un covo di bestie.', lvl: 8, cost: 18, enemyAtk: 35, enemyDef: 15, loot: ['Mitraglietta Uzi', 'Sacca a Tracolla', 'Bende', 'Giacca di Pelle', 'Pantaloni Sopravvivenza'], minLoot: 2, maxLoot: 4 },
  { id: 'citylife', name: 'CityLife (Torri)', type: 'danger', x: 28, y: 34, desc: 'I grattacieli nascondono orrori.', lvl: 14, cost: 25, enemyAtk: 65, enemyDef: 30, loot: ['FAMAS Silenziato', 'Giacca da Caccia', 'Medikit', 'Componenti Elettronici', 'Stivali da Trekking'], minLoot: 2, maxLoot: 5 },
  { id: 'idroscalo', name: 'Idroscalo (Acque Morte)', type: 'danger', x: 92, y: 65, desc: 'Il mare di Milano, ora palude letale.', lvl: 20, cost: 35, enemyAtk: 95, enemyDef: 45, loot: ['AK-47 Tamburo', 'Pistola Tamburo', 'Munizioni 5.56', 'Corazza Antisommossa', 'Pantaloni Antisommossa'], minLoot: 3, maxLoot: 5 },
  { id: 'linate', name: 'Linate (Aeroporto)', type: 'danger', x: 88, y: 80, desc: 'Pieno di armamenti ma super sorvegliato.', lvl: 28, cost: 45, enemyAtk: 140, enemyDef: 70, loot: ['Mitragliatrice M249', 'Corazza Forze Speciali', 'Pantaloni Forze Speciali', 'Stivali Tattici Avanzati'], minLoot: 4, maxLoot: 6 }
];

const MAX_HP = 100;
const MAX_ENERGY = 100;
const BASE_ATK = 5;
const BASE_DEF = 0;

export default function App() {
  const [view, setView] = useState('equipment');
  const [hp, setHp] = useState(MAX_HP);
  const [energy, setEnergy] = useState(MAX_ENERGY);
  const [credits, setCredits] = useState(100);
  const [day, setDay] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [deathReason, setDeathReason] = useState('');
  
  const [equipped, setEquipped] = useState({
    helmet: 'Cappello di Lana', chest: 'Giacca Casual', pants: 'Jeans Strappati', shoes: 'Scarpe da Ginnastica', weapon: 'Coltellino', backpack: 'Sacca Sportiva'
  });

  const [inventory, setInventory] = useState(['Acqua Purificata', 'Razione K', 'Bende']); 
  const [stash, setStash] = useState(['Acqua Purificata', 'Razione K', 'Rottami']); 
  
  const [logs, setLogs] = useState([{ text: 'Sistema avviato. Trova risorse e sopravvivi.', type: 'info' }]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  
  const logEndRef = useRef(null);

  useEffect(() => { logEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [logs]);

  useEffect(() => { if (hp <= 0 && !gameOver) setGameOver(true); }, [hp, gameOver]);

  const getMaxInventory = () => equipped.backpack ? ITEMS[equipped.backpack].slots : 5;
  const getAtk = () => BASE_ATK + (equipped.weapon ? ITEMS[equipped.weapon].atk : 0);
  const getDef = () => BASE_DEF + 
    (equipped.helmet ? ITEMS[equipped.helmet].def : 0) +
    (equipped.chest ? ITEMS[equipped.chest].def : 0) +
    (equipped.pants ? ITEMS[equipped.pants].def : 0) +
    (equipped.shoes ? ITEMS[equipped.shoes].def : 0);

  const addLog = (text, type = 'info') => setLogs(prev => [...prev, { text, type }]);

  const handleItemAction = (itemStr, index, context) => { setSelectedItem({ name: itemStr, index, context, data: ITEMS[itemStr] }); };

  const equipItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    const type = data.type;
    
    if (type === 'backpack') {
      if (inventory.length - 1 > data.slots) {
        addLog('Svuota lo zaino prima di cambiarlo!', 'warning');
        setSelectedItem(null);
        return;
      }
    }

    let currentEquipped = equipped[type];
    let newInventory = [...inventory];
    
    newInventory.splice(index, 1);
    if (currentEquipped) newInventory.push(currentEquipped);
    
    setInventory(newInventory);
    setEquipped(prev => ({ ...prev, [type]: name }));
    addLog(`Equipaggiato: ${name}`, 'success');
    setSelectedItem(null);
  };

  const unequipItem = (type) => {
    const itemName = equipped[type];
    if (!itemName) return;
    if (type === 'backpack') { addLog('Non puoi disequipaggiare lo zaino.', 'warning'); return; }
    if (inventory.length >= getMaxInventory()) { addLog('Inventario pieno.', 'warning'); return; }

    setEquipped(prev => ({ ...prev, [type]: null }));
    setInventory(prev => [...prev, itemName]);
    addLog(`Rimosso: ${itemName}`, 'info');
  };

  const useItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    
    if (data.type === 'medical' || data.type === 'consumable') {
      if (hp >= MAX_HP) { addLog('Salute già al massimo.', 'warning'); return; }
      setHp(prev => Math.min(MAX_HP, prev + data.heal));
      let newInv = [...inventory];
      newInv.splice(index, 1);
      setInventory(newInv);
      addLog(`Usato ${name}. (+${data.heal} HP)`, 'success');
      setSelectedItem(null);
    }
  };

  const moveItem = (fromArray, setFromArray, toArray, setToArray, index, toMax) => {
    if (toArray.length >= toMax) { addLog('Spazio insufficiente.', 'warning'); return; }
    const item = fromArray[index];
    const newFrom = [...fromArray];
    newFrom.splice(index, 1);
    setFromArray(newFrom);
    setToArray(prev => [...prev, item]);
    setSelectedItem(null);
  };

  const sellItem = () => {
    if (!selectedItem) return;
    const { name, index, data } = selectedItem;
    setCredits(prev => prev + data.value);
    let newInv = [...inventory];
    newInv.splice(index, 1);
    setInventory(newInv);
    addLog(`Venduto ${name} (+${data.value} ¢)`, 'success');
    setSelectedItem(null);
  };

  const explore = (loc) => {
    if (loc.type === 'safe') {
      if (energy < loc.cost) { addLog(`Energia insufficiente.`, 'warning'); return; }
      setEnergy(prev => prev - loc.cost);
      setView(loc.id === 'rifugio' ? 'base' : 'market');
      setSelectedLocation(null);
      addLog(`Sei a: ${loc.name}`, 'info');
      return;
    }

    if (energy < loc.cost) { addLog(`Energia insufficiente.`, 'warning'); return; }
    if (inventory.length >= getMaxInventory()) { addLog('Inventario pieno.', 'warning'); return; }

    setEnergy(prev => prev - loc.cost);
    addLog(`Esplorazione: ${loc.name}...`, 'info');

    let dmgTaken = Math.max(0, loc.enemyAtk - getDef());
    let combatEfficiency = Math.max(0.2, 1 - (getAtk() / (loc.enemyAtk * 1.5)));
    let finalDmg = Math.floor(dmgTaken * combatEfficiency * (0.8 + Math.random() * 0.4));
    
    if (finalDmg > 0) {
      setHp(prev => Math.max(0, prev - finalDmg));
      addLog(`Scontro! Danni subiti: ${finalDmg} HP.`, 'danger');
      if (hp - finalDmg <= 0) { setDeathReason(`Ucciso dai nemici a ${loc.name}.`); return; }
    } else {
      addLog('Zona ripulita senza subire danni.', 'success');
    }

    const numItems = Math.floor(Math.random() * (loc.maxLoot - loc.minLoot + 1)) + loc.minLoot;
    let found = [];
    let spaceLeft = getMaxInventory() - inventory.length;
    let uniqueEquipmentFound = new Set(); 

    for (let i = 0; i < numItems && spaceLeft > 0; i++) {
      let attempts = 0;
      let finalItem = null;

      while (attempts < 15) {
        let candidate = loc.loot[Math.floor(Math.random() * loc.loot.length)];
        let candidateType = ITEMS[candidate].type;
        let isEquipment = ['weapon', 'helmet', 'chest', 'pants', 'shoes', 'backpack'].includes(candidateType);

        if (isEquipment) {
          if (!uniqueEquipmentFound.has(candidate)) {
            finalItem = candidate;
            uniqueEquipmentFound.add(candidate);
            break;
          }
        } else {
          finalItem = candidate;
          break;
        }
        attempts++;
      }

      if (finalItem) {
        found.push(finalItem);
        spaceLeft--;
      }
    }

    if (found.length > 0) {
      addLog(`Trovato: ${found.join(', ')}`, 'info');
      setInventory(prev => [...prev, ...found]);
    } else {
      addLog('Niente di utile trovato.', 'warning');
    }
    setSelectedLocation(null);
  };

  const rest = () => {
    let hasFood = stash.includes('Razione K');
    let hasWater = stash.includes('Acqua Purificata');
    let dmg = 0;
    let newStash = [...stash];

    if (hasFood) { newStash.splice(newStash.indexOf('Razione K'), 1); addLog('Hai mangiato.', 'success'); } 
    else { dmg += 20; addLog('Stai morendo di fame (-20 HP).', 'danger'); }

    if (hasWater) { newStash.splice(newStash.indexOf('Acqua Purificata'), 1); addLog('Hai bevuto.', 'success'); } 
    else { dmg += 20; addLog('Stai morendo di sete (-20 HP).', 'danger'); }

    setStash(newStash);
    setDay(prev => prev + 1);
    setEnergy(MAX_ENERGY);

    if (dmg > 0) {
      setHp(prev => prev - dmg);
      if (hp - dmg <= 0) setDeathReason("Morto di stenti nel rifugio.");
    } else {
      setHp(prev => Math.min(MAX_HP, prev + 30));
      addLog('Riposo completato. Energia recuperata.', 'info');
    }
    addLog(`--- GIORNO ${day + 1} ---`, 'warning');
  };

  const restartGame = () => {
    setHp(MAX_HP); setEnergy(MAX_ENERGY); setCredits(100); setDay(1);
    setInventory(['Acqua Purificata', 'Razione K', 'Coltellino']);
    setStash(['Acqua Purificata', 'Razione K', 'Bende']);
    setEquipped({ helmet: 'Cappello di Lana', chest: 'Giacca Casual', pants: 'Jeans Strappati', shoes: 'Scarpe da Ginnastica', weapon: 'Coltellino', backpack: 'Sacca Sportiva' });
    setLogs([{ text: 'Nuova vita.', type: 'info' }]);
    setGameOver(false); setView('equipment');
  };

  // --- MOTORE RENDER DELLE TUE IMMAGINI ---
  const CustomImageRenderer = ({ itemData, itemName, sizeClass = "w-10 h-10 sm:w-12 sm:h-12" }) => {
    const [imgError, setImgError] = useState(false);
    
    if (!itemData) return null;
    const IconComponent = itemData.iconType || Package;
    const customUrl = CUSTOM_IMAGES[itemName];

    if (customUrl && customUrl.trim() !== '' && !imgError) {
      return (
        <div className={`relative flex items-center justify-center ${sizeClass} drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300`}>
          <img 
            src={customUrl} 
            alt={itemName} 
            className="w-full h-full object-contain"
            onError={() => setImgError(true)} 
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className={`relative flex items-center justify-center ${sizeClass} opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300`}>
         <IconComponent strokeWidth={1.5} className="w-full h-full text-stone-200 drop-shadow-md" />
      </div>
    );
  };

  // --- RENDERERS INTERFACCIA ---
  const InventoryGrid = ({ items, maxSlots, onSelect, context }) => {
    const gridItems = [];
    for (let i = 0; i < maxSlots; i++) {
      const itemStr = items[i];
      if (itemStr) {
        const itemData = ITEMS[itemStr];
        const rColor = RARITY[itemData.rarity].color;
        const rBorder = RARITY[itemData.rarity].border;
        const rBg = RARITY[itemData.rarity].bg;
        const isSelected = selectedItem?.index === i && selectedItem?.context === context;

        gridItems.push(
          <div key={`${context}-${i}`} onClick={() => onSelect(itemStr, i, context)}
            className={`aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all border-2 relative overflow-hidden group
              ${isSelected ? `border-white scale-[1.03] z-10 ${rBg}` : `${rBorder} ${rBg} hover:border-gray-300`}`}
            style={{ boxShadow: isSelected ? `inset 0 0 30px ${RARITY[itemData.rarity].glow}, 0 0 15px rgba(255,255,255,0.2)` : `inset 0 0 20px ${RARITY[itemData.rarity].glow}` }}
          >
            <div className="absolute inset-0 pb-4 flex items-center justify-center pointer-events-none">
              <CustomImageRenderer itemData={itemData} itemName={itemStr} />
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent pt-6 pb-1 px-1 z-30">
              <span className={`text-[9px] text-center leading-tight line-clamp-1 font-bold block ${rColor}`}>{itemStr}</span>
            </div>
          </div>
        );
      } else {
        gridItems.push(
          <div key={`${context}-empty-${i}`} className="aspect-square bg-stone-900/30 border-2 border-stone-800/50 rounded-xl flex items-center justify-center shadow-inner relative">
             <div className="w-1.5 h-1.5 rounded-full bg-stone-800/50"></div>
          </div>
        );
      }
    }
    return (
      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 p-2 bg-[#12100f] rounded-xl border border-stone-800/50 shadow-inner">
        {gridItems}
      </div>
    );
  };

  const ItemActionMenu = () => {
    if (!selectedItem) return null;
    const { name, context, data } = selectedItem;
    
    return (
      <div className="bg-stone-900 border border-stone-700 rounded-xl p-4 mt-4 animate-fadeIn shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full blur-[50px] opacity-30 pointer-events-none" style={{ backgroundColor: RARITY[data.rarity].color.replace('text-', '').split('-')[0] }}></div>

        <div className="flex justify-between items-start mb-3 relative z-10">
          <div className="flex items-center space-x-3">
            <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-lg flex items-center justify-center bg-[#151312] border-2 ${RARITY[data.rarity].border} shadow-inner`}
                 style={{ boxShadow: `inset 0 0 30px ${RARITY[data.rarity].glow}` }}>
              <CustomImageRenderer itemData={data} itemName={name} sizeClass="w-16 h-16 sm:w-20 sm:h-20" />
            </div>
            <div>
              <h4 className="font-black text-xl sm:text-2xl text-stone-100 leading-tight">{name}</h4>
              <p className={`text-xs font-black uppercase tracking-widest ${RARITY[data.rarity].color} mt-1`}>{RARITY[data.rarity].name}</p>
            </div>
          </div>
          <button onClick={() => setSelectedItem(null)} className="text-stone-500 hover:text-stone-300 transition-colors p-1">✕</button>
        </div>
        
        <p className="text-sm text-stone-300 italic mb-4 relative z-10 bg-[#151312] p-3 rounded-lg border border-stone-800">"{data.desc}"</p>
        
        <div className="flex flex-wrap gap-2 text-xs font-mono mb-4 relative z-10">
          <span className="bg-stone-950 px-3 py-1.5 rounded-lg text-amber-400 border border-stone-800 flex items-center shadow-sm"><Coins className="w-3 h-3 mr-1.5"/> {data.value} ¢</span>
          {data.atk && <span className="bg-stone-950 px-3 py-1.5 rounded-lg text-red-400 border border-stone-800 flex items-center shadow-sm"><Crosshair className="w-3 h-3 mr-1.5"/> ATK +{data.atk}</span>}
          {data.def && <span className="bg-stone-950 px-3 py-1.5 rounded-lg text-blue-400 border border-stone-800 flex items-center shadow-sm"><Shield className="w-3 h-3 mr-1.5"/> DEF +{data.def}</span>}
          {data.heal && <span className="bg-stone-950 px-3 py-1.5 rounded-lg text-green-400 border border-stone-800 flex items-center shadow-sm"><PlusSquare className="w-3 h-3 mr-1.5"/> Cura {data.heal}</span>}
          {data.slots && <span className="bg-stone-950 px-3 py-1.5 rounded-lg text-purple-400 border border-stone-800 flex items-center shadow-sm"><Backpack className="w-3 h-3 mr-1.5"/> {data.slots} Slot</span>}
        </div>

        <div className="flex gap-2 relative z-10">
          {context === 'inventory' && view === 'equipment' && ['weapon', 'helmet', 'chest', 'pants', 'shoes', 'backpack'].includes(data.type) && (
            <button onClick={equipItem} className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm py-3.5 rounded-lg font-black uppercase tracking-wider transition-colors shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-none">Equipaggia</button>
          )}
          {context === 'inventory' && ['medical', 'consumable'].includes(data.type) && (
            <button onClick={useItem} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white text-sm py-3.5 rounded-lg font-black uppercase tracking-wider transition-colors shadow-[0_4px_0_rgb(29,78,216)] active:translate-y-1 active:shadow-none">Usa Oggetto</button>
          )}
          {context === 'inventory' && view === 'base' && (
            <button onClick={() => moveItem(inventory, setInventory, stash, setStash, selectedItem.index, 100)} className="flex-1 bg-stone-700 hover:bg-stone-600 text-white text-sm py-3.5 rounded-lg border border-stone-600 font-black uppercase tracking-wider transition-colors shadow-[0_4px_0_rgb(68,64,60)] active:translate-y-1 active:shadow-none">Deposita</button>
          )}
          {context === 'stash' && view === 'base' && (
            <button onClick={() => moveItem(stash, setStash, inventory, setInventory, selectedItem.index, getMaxInventory())} className="flex-1 bg-stone-700 hover:bg-stone-600 text-white text-sm py-3.5 rounded-lg border border-stone-600 font-black uppercase tracking-wider transition-colors shadow-[0_4px_0_rgb(68,64,60)] active:translate-y-1 active:shadow-none">Prendi in Zaino</button>
          )}
          {context === 'inventory' && view === 'market' && (
            <button onClick={sellItem} className="flex-1 bg-amber-600 hover:bg-amber-500 text-white text-sm py-3.5 rounded-lg font-black uppercase tracking-wider transition-colors shadow-[0_4px_0_rgb(180,83,9)] active:translate-y-1 active:shadow-none flex justify-center items-center">
              Vendi <Coins className="w-4 h-4 ml-2"/>
            </button>
          )}
        </div>
      </div>
    );
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-[#1a1816] border-2 border-red-900 p-8 rounded-xl text-center shadow-[0_0_50px_rgba(220,38,38,0.2)] relative overflow-hidden">
          <Skull className="w-24 h-24 text-red-600 mx-auto mb-4 animate-pulse relative z-10" />
          <h1 className="text-5xl font-black text-white mb-2 uppercase tracking-widest relative z-10">Morto</h1>
          <p className="text-stone-400 mb-6 text-base relative z-10">{deathReason}</p>
          <div className="bg-stone-950 p-4 rounded-lg mb-6 text-left space-y-2 border border-stone-800 text-sm font-mono relative z-10">
            <p className="flex justify-between text-stone-400"><span>GIORNI SOPRAVVISSUTI</span> <span className="text-white font-bold">{day}</span></p>
            <p className="flex justify-between text-stone-400"><span>CREDITI ACCUMULATI</span> <span className="text-amber-400 font-bold">{credits}</span></p>
          </div>
          <button onClick={restartGame} className="w-full bg-red-700 hover:bg-red-600 text-white text-base font-black tracking-widest py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors relative z-10 shadow-[0_4px_0_rgb(153,27,27)] active:translate-y-1 active:shadow-none">
            <ArchiveRestore className="w-5 h-5" /> <span>NUOVA VITA</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#11100e] text-stone-300 font-sans flex flex-col h-screen overflow-hidden selection:bg-amber-900">
      
      <header className="bg-[#1a1816] border-b border-stone-800 p-3 shadow-md z-10 flex-shrink-0">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <div className="relative w-32 sm:w-48 h-6 bg-[#0a0908] border border-stone-700 rounded-md overflow-hidden flex items-center shadow-inner">
              <div className="absolute top-0 left-0 h-full bg-red-600 transition-all duration-300" style={{ width: `${(hp / MAX_HP) * 100}%` }}></div>
              <div className="absolute w-full text-center text-xs font-black tracking-widest text-white drop-shadow-md flex items-center justify-center h-full z-10">
                 <Heart className="w-3.5 h-3.5 mr-1.5"/> {hp}/{MAX_HP}
              </div>
            </div>
            <div className="relative w-24 sm:w-32 h-6 bg-[#0a0908] border border-stone-700 rounded-md overflow-hidden flex items-center shadow-inner">
              <div className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-300" style={{ width: `${(energy / MAX_ENERGY) * 100}%` }}></div>
              <div className="absolute w-full text-center text-xs font-black tracking-widest text-white drop-shadow-md flex items-center justify-center h-full z-10">
                <Zap className="w-3.5 h-3.5 mr-1.5"/> {energy}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
             <div className="flex items-center bg-[#0a0908] px-3 py-1.5 rounded-md border border-stone-800 text-xs sm:text-sm shadow-inner">
               <Coins className="w-4 h-4 text-amber-400 mr-2" />
               <span className="font-mono font-bold text-white">{credits}</span>
             </div>
             <div className="text-xs sm:text-sm font-mono bg-[#0a0908] px-3 py-1.5 rounded-md border border-stone-800 text-stone-400 shadow-inner">
               DAY <span className="text-amber-500 font-bold ml-1.5">{day}</span>
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full flex flex-col md:flex-row overflow-hidden">
        
        <div className="flex-1 flex flex-col overflow-hidden relative">
          
          <div className="flex bg-[#1a1816] border-b border-stone-800 z-10 flex-shrink-0">
            {['equipment', 'map', 'base', 'market'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {setView(tab); setSelectedItem(null);}} 
                className={`flex-1 py-3 border-b-4 flex flex-col items-center justify-center transition-all ${
                  view === tab ? 'border-amber-500 text-amber-400 bg-stone-900' : 'border-transparent text-stone-500 hover:bg-stone-900/50 hover:text-stone-300'
                }`}
              >
                {tab === 'equipment' && <User className="w-5 h-5 mb-1" />}
                {tab === 'map' && <MapPin className="w-5 h-5 mb-1" />}
                {tab === 'base' && <Home className="w-5 h-5 mb-1" />}
                {tab === 'market' && <ShoppingCart className="w-5 h-5 mb-1" />}
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {tab === 'equipment' ? 'Equip' : tab === 'base' ? 'Rifugio' : tab}
                </span>
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-5 custom-scrollbar bg-[#0f0e0d] relative">
            
            {view === 'map' && (
              <div className="h-full min-h-[400px] w-full bg-[#1f1c1a] rounded-xl border-2 border-stone-700 relative overflow-hidden shadow-inner">
                <iframe 
                  className="absolute inset-0 w-full h-full opacity-60"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=9.130,45.434,9.250,45.494&layer=mapnik" 
                  style={{ 
                    border: 'none', pointerEvents: 'none',
                    filter: 'invert(0.9) sepia(0.5) hue-rotate(160deg) brightness(0.7)' 
                  }}
                ></iframe>
                
                {LOCATIONS.map(loc => (
                  <button 
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border-2 transition-all hover:scale-110 cursor-pointer backdrop-blur-[2px] ${
                      loc.type === 'safe' ? 'bg-green-950/80 border-green-500 text-green-400 shadow-[0_0_15px_rgba(34,197,94,0.5)]' : 
                      loc.lvl > 15 ? 'bg-red-950/80 border-red-500 text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 'bg-amber-950/80 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
                    }`}
                    style={{ top: `${loc.y}%`, left: `${loc.x}%` }}
                    title={loc.name}
                  >
                    {loc.lvl > 15 && <div className="absolute inset-0 rounded-full border border-red-500 opacity-50 animate-ping pointer-events-none"></div>}
                    {loc.type === 'safe' ? <Home className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" /> : <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />}
                  </button>
                ))}

                {selectedLocation && (
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1a1816]/95 backdrop-blur border border-stone-600 rounded-xl p-5 shadow-2xl flex flex-col z-20 animate-slideUp">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-xl text-white uppercase tracking-wide">{selectedLocation.name}</h3>
                      <button onClick={() => setSelectedLocation(null)} className="text-stone-500 hover:text-stone-300">✕</button>
                    </div>
                    <p className="text-sm text-stone-300 mb-4">{selectedLocation.desc}</p>
                    
                    <div className="flex justify-between items-center mb-5 text-xs font-mono bg-[#0a0908] p-3 rounded-lg border border-stone-800">
                      <span className={selectedLocation.type === 'safe' ? 'text-green-400 font-bold' : 'text-amber-400 font-bold'}>
                        {selectedLocation.type === 'safe' ? 'ZONA SICURA' : `MINACCIA: LVL ${selectedLocation.lvl}`}
                      </span>
                      <span className="flex items-center text-amber-400 font-bold"><Zap className="w-4 h-4 mr-1.5"/> COSTO: {selectedLocation.cost}</span>
                    </div>

                    <button 
                      onClick={() => explore(selectedLocation)}
                      className={`w-full py-4 rounded-lg font-black tracking-widest flex items-center justify-center uppercase transition-all text-sm
                        ${energy >= selectedLocation.cost 
                          ? 'bg-green-600 hover:bg-green-500 text-white shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-1 active:shadow-none' 
                          : 'bg-stone-900 border border-stone-800 text-stone-600 cursor-not-allowed'}`}
                    >
                      <Navigation className="w-5 h-5 mr-2"/>
                      {selectedLocation.type === 'safe' ? 'VIAGGIA ORA' : 'ESPLORA SETTORE'}
                    </button>
                  </div>
                )}
              </div>
            )}

            {view === 'equipment' && (
              <div className="flex flex-col lg:flex-row gap-4 h-full">
                
                {/* LATO SINISTRO: PERSONAGGIO */}
                <div className="w-full lg:w-[35%] flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="flex-1 bg-[#1a1816] p-3 rounded-xl border border-stone-800 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-[10px] text-stone-500 font-bold mb-1 uppercase tracking-widest">Difesa</span>
                      <span className="text-2xl font-black text-blue-400 flex items-center"><Shield className="w-5 h-5 mr-2 opacity-50"/>{getDef()}</span>
                    </div>
                    <div className="flex-1 bg-[#1a1816] p-3 rounded-xl border border-stone-800 flex flex-col items-center justify-center shadow-lg">
                      <span className="text-[10px] text-stone-500 font-bold mb-1 uppercase tracking-widest">Attacco</span>
                      <span className="text-2xl font-black text-red-400 flex items-center"><Crosshair className="w-5 h-5 mr-2 opacity-50"/>{getAtk()}</span>
                    </div>
                  </div>

                  <div className="relative flex-1 min-h-[320px] flex flex-col items-center justify-center py-6 bg-[#1a1816] rounded-xl border border-stone-800 overflow-hidden shadow-lg">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                      <User className="w-4/5 h-4/5 text-stone-100" />
                    </div>

                    <div className="grid grid-cols-3 gap-3 w-full relative z-10 px-3 sm:px-6">
                      <div className="flex flex-col gap-5 items-end justify-center">
                        <EquipSlot type="weapon" item={equipped.weapon} onUnequip={() => unequipItem('weapon')} label="Arma" />
                        <div className="h-10"></div>
                        <EquipSlot type="backpack" item={equipped.backpack} onUnequip={() => unequipItem('backpack')} label="Zaino" />
                      </div>
                      <div className="flex flex-col gap-3 items-center">
                        <EquipSlot type="helmet" item={equipped.helmet} onUnequip={() => unequipItem('helmet')} label="Testa" />
                        <EquipSlot type="chest" item={equipped.chest} onUnequip={() => unequipItem('chest')} label="Busto" />
                        <EquipSlot type="pants" item={equipped.pants} onUnequip={() => unequipItem('pants')} label="Gambe" />
                        <EquipSlot type="shoes" item={equipped.shoes} onUnequip={() => unequipItem('shoes')} label="Piedi" />
                      </div>
                      <div className="flex flex-col gap-3 items-start justify-center"></div>
                    </div>
                  </div>
                </div>

                {/* LATO DESTRO: INVENTARIO */}
                <div className="w-full lg:w-[65%] flex flex-col bg-[#1a1816] border border-stone-800 rounded-xl p-4 shadow-lg">
                  <div className="flex justify-between items-center mb-4 border-b border-stone-800 pb-3">
                    <h3 className="text-base font-black text-stone-200 uppercase tracking-widest flex items-center">
                      <Backpack className="w-5 h-5 mr-2 text-stone-500" /> Zaino Equipaggiato
                    </h3>
                    <span className="text-[11px] font-mono bg-[#0a0908] px-3 py-1.5 rounded-lg text-stone-400 border border-stone-800 shadow-inner">
                      SLOT: <span className={inventory.length >= getMaxInventory() ? 'text-red-400 font-bold' : 'text-green-400 font-bold'}>{inventory.length}/{getMaxInventory()}</span>
                    </span>
                  </div>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                    <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                    <ItemActionMenu />
                  </div>
                </div>

              </div>
            )}

            {view === 'base' && (
              <div className="flex flex-col lg:flex-row gap-4 h-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                  <div className="bg-[#1a1816] p-8 rounded-xl border border-stone-800 text-center flex-1 flex flex-col justify-center items-center shadow-lg relative overflow-hidden">
                    <Home className="w-16 h-16 text-green-500 mb-4 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]" />
                    <h2 className="text-2xl font-black text-stone-100 uppercase tracking-widest mb-2">Rifugio</h2>
                    <p className="text-stone-400 text-sm mb-8 max-w-[220px]">Riposare ripristina energia. Consuma 1 Razione e 1 Acqua.</p>
                    <button onClick={rest} className="w-full bg-green-600 hover:bg-green-500 text-white text-sm py-4 rounded-lg font-black uppercase tracking-wider transition-colors shadow-[0_4px_0_rgb(21,128,61)] active:translate-y-2 active:shadow-none flex items-center justify-center">
                      <Coffee className="w-5 h-5 mr-2" /> Riposa
                    </button>
                  </div>
                </div>

                <div className="w-full lg:w-2/3 flex flex-col gap-4">
                  <div className="bg-[#1a1816] rounded-xl p-4 border border-stone-800 flex-1 flex flex-col shadow-lg">
                    <h3 className="text-xs font-black text-stone-300 uppercase tracking-widest mb-3 border-b border-stone-800 pb-2 flex items-center">
                      <Backpack className="w-4 h-4 mr-2 text-stone-500"/> Oggetti nello Zaino
                    </h3>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                      <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                    </div>
                  </div>
                  <div className="bg-[#1a1816] rounded-xl p-4 border border-stone-800 flex-[1.5] flex flex-col shadow-lg">
                    <div className="flex justify-between items-center mb-3 border-b border-stone-800 pb-2">
                      <h3 className="text-xs font-black text-stone-300 uppercase tracking-widest flex items-center">
                        <ArchiveRestore className="w-4 h-4 mr-2 text-stone-500"/> Cassa Scorte
                      </h3>
                      <span className="text-[10px] font-mono text-stone-500 bg-[#0a0908] px-2 py-1 rounded">{stash.length}/100</span>
                    </div>
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                       <InventoryGrid items={stash} maxSlots={Math.max(20, Math.ceil(stash.length/5)*5 + 5)} onSelect={handleItemAction} context="stash" />
                    </div>
                  </div>
                </div>
                <div className="w-full mt-auto">
                   <ItemActionMenu />
                </div>
              </div>
            )}

            {view === 'market' && (
              <div className="flex flex-col lg:flex-row gap-4 h-full">
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                  <div className="bg-[#1a1816] p-8 rounded-xl border border-stone-800 flex-1 flex flex-col justify-center shadow-lg relative overflow-hidden">
                    <div className="bg-amber-900/20 p-5 rounded-2xl inline-block self-start mb-5 border border-amber-500/20">
                      <Store className="w-12 h-12 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-black text-stone-100 uppercase tracking-widest mb-2">Mercante</h2>
                    <p className="text-sm text-stone-400 mb-8">"Compro di tutto. Pagamento in contanti."</p>
                    <div className="bg-[#0a0908] p-4 rounded-xl border border-stone-800 shadow-inner">
                      <span className="block text-[10px] text-stone-500 font-bold uppercase tracking-widest mb-1">Saldo Attuale</span>
                      <span className="text-3xl font-black text-amber-400 flex items-center"><Coins className="w-7 h-7 mr-2 opacity-80"/>{credits}</span>
                    </div>
                  </div>
                </div>
                
                <div className="w-full lg:w-2/3 bg-[#1a1816] rounded-xl p-4 border border-stone-800 flex flex-col shadow-lg">
                  <h3 className="text-sm font-black text-stone-300 uppercase tracking-widest mb-4 border-b border-stone-800 pb-3 flex items-center">
                     <ShoppingCart className="w-5 h-5 mr-2 text-stone-500"/> Seleziona per vendere
                  </h3>
                  <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                     <InventoryGrid items={inventory} maxSlots={getMaxInventory()} onSelect={handleItemAction} context="inventory" />
                     <ItemActionMenu />
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        <div className="w-full md:w-64 lg:w-72 bg-[#0a0908] border-l border-stone-800 flex flex-col flex-shrink-0 h-40 md:h-auto font-mono text-[10px] shadow-inner z-20">
          <div className="bg-[#1a1816] text-stone-500 p-3 border-b border-stone-800 flex justify-between items-center tracking-widest text-[10px] uppercase font-bold shadow-sm">
            <span>SYS_LOG</span>
            <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_#22c55e] mr-2"></span> ON</span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5 custom-scrollbar">
            {logs.map((log, index) => {
              let color = 'text-stone-400';
              if (log.type === 'danger') color = 'text-red-400 font-bold';
              if (log.type === 'success') color = 'text-green-400';
              if (log.type === 'warning') color = 'text-amber-400 italic';
              if (log.type === 'loot') color = 'text-blue-300';
              
              return (
                <div key={index} className={`${color} leading-tight break-words`}>
                  <span className="opacity-40 mr-2 text-stone-600">{'>'}</span>{log.text}
                </div>
              );
            })}
            <div ref={logEndRef} />
          </div>
        </div>

      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #292524; border-radius: 6px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #44403c; }
        .animate-slideUp { animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );

function EquipSlot({ type, item, onUnequip, label }) {
    if (item) {
      const data = ITEMS[item];
      const rColor = RARITY[data.rarity].color;
      const rBg = RARITY[data.rarity].bg;
      const rBorder = RARITY[data.rarity].border;
      return (
        <div className="flex flex-col items-center">
          <div onClick={onUnequip} 
               className={`w-16 h-16 sm:w-20 sm:h-20 bg-[#0a0908] border-2 ${rBorder} ${rBg} rounded-xl flex items-center justify-center cursor-pointer hover:border-stone-300 transition-all relative group overflow-hidden shadow-lg`}
               style={{ boxShadow: `inset 0 0 20px ${RARITY[data.rarity].glow}` }}>
            <div className="absolute inset-0 flex items-center justify-center p-2">
              <CustomImageRenderer itemData={data} itemName={item} sizeClass="w-full h-full" />
            </div>
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-30">
              <span className="text-[9px] font-black text-white uppercase tracking-widest">Rimuovi</span>
            </div>
          </div>
          <span className={`text-[9px] sm:text-[10px] mt-2 font-bold uppercase tracking-widest ${rColor} drop-shadow-sm`}>{label}</span>
        </div>
      );
    }
    
    return (
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#12100f] border-2 border-stone-800 border-dashed rounded-xl flex flex-col items-center justify-center opacity-70 shadow-inner">
           {type === 'weapon' && <Crosshair className="w-6 h-6 text-stone-600" />}
           {type === 'backpack' && <Backpack className="w-6 h-6 text-stone-600" />}
           {type === 'helmet' && <Shield className="w-6 h-6 text-stone-600" />}
           {type === 'chest' && <Shirt className="w-6 h-6 text-stone-600" />}
           {type === 'pants' && <Scissors className="w-6 h-6 text-stone-600" />}
           {type === 'shoes' && <User className="w-6 h-6 text-stone-600" />}
        </div>
        <span className="text-[9px] sm:text-[10px] mt-2 font-bold text-stone-600 uppercase tracking-widest">{label}</span>
      </div>
    );
  }
}
