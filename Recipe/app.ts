/** 製造手段。 */
enum ProducerCategory {
    Hand,
    AssemblingMachine,
    ChemicalPlant,
    Furnace,
    RocketSilo,
}

class Producer {
    private _item: Item;
    private _baseCraftingSpeed: number;
    private _craftingSpeed: number;
    private _modules: Module[];

    public constructor(item: Item, modules: Module[] = []) {
        this._item = item;
        this._modules = modules;

        if (item.equals(Item.AssemblingMachine1)) {
            this._baseCraftingSpeed = 0.5;
        }
        else if (item.equals(Item.AssemblingMachine2)) {
            this._baseCraftingSpeed = 0.75;
        }
        else if (item.equals(Item.AssemblingMachine3)) {
            this._baseCraftingSpeed = 1.25;
        }
        else if (item.equals(Item.ChemicalPlant)) {
            this._baseCraftingSpeed = 1.25;
        }
        else if (item.equals(Item.ElectricFurnace)) {
            this._baseCraftingSpeed = 2.0;
        }
        else if (item.equals(Item.RocketSilo)) {
            this._baseCraftingSpeed = 1.0;
        }
        else {
            throw Error();
        }

        let speedPercent = 0;
        for (const module of modules) {
            speedPercent += module.speedPercent;
        }
        this._craftingSpeed = this._baseCraftingSpeed * ((100 + speedPercent) / 100);
    }

    public get item(): Item { return this._item; }

    /** モジュールを適用する前の製作速度。 */
    public get baseCraftingSpeed(): number { return this._baseCraftingSpeed; }

    /** モジュールを適用した後の製作速度。 */
    public get craftingSpeed(): number { return this._craftingSpeed; }

    public get modules(): Module[] { return this._modules; }
}

/** アイテムの分類。 */
enum ItemCategory {
    Resource,
    Logistics,
    Production,
    Intermediate,
    Combat,
}

/** 一つのアイテムを表します。 */
class Item {
    private _name: string;
    private _label: string;
    private _category: ItemCategory;
    private _sortOrder: number;

    private constructor(name: string, label: string, category: ItemCategory, sortOrder: number) {
        this._name = name;
        this._label = label;
        this._category = category;
        this._sortOrder = sortOrder;
    }

    public get name(): string { return this._name; }
    public get label(): string { return this._label; }
    public get sortOrder(): number { return this._sortOrder; }

    public equals(other: Item): boolean {
        return this.name == other.name;
    }

    private static _all: Item[] = []

    private static def(name: string, label: string, category: ItemCategory): Item {
        let item = new Item(name, label, category, Item._all.length);
        Item._all.push(item);
        return item;
    }

    // 完成品 2
    public static readonly SolarPanel           = Item.def('SolarPanel'          , 'ソーラーパネル'     , ItemCategory.Production)
    public static readonly Accumulator          = Item.def('Accumulator'         , '蓄電池'             , ItemCategory.Production)

    // 完成品 4
    public static readonly ElectricFurnace      = Item.def('ElectricFurnace'     , '電気炉'             , ItemCategory.Production)

    // 完成品 5
    public static readonly AssemblingMachine1   = Item.def('AssemblingMachine1'  , '組立機1'            , ItemCategory.Production)
    public static readonly AssemblingMachine2   = Item.def('AssemblingMachine2'  , '組立機2'            , ItemCategory.Production)
    public static readonly AssemblingMachine3   = Item.def('AssemblingMachine3'  , '組立機3'            , ItemCategory.Production)
    public static readonly ChemicalPlant        = Item.def('ChemicalPlant'       , '化学プラント'       , ItemCategory.Production)

    // 完成品 6
    public static readonly SpeedModule1         = Item.def('SpeedModule1'        , '生産速度モジュール1', ItemCategory.Production)
    public static readonly ProductivityModule3  = Item.def('ProductivityModule3' , '生産効率モジュール3', ItemCategory.Production)

    // 中間生産物 1
    public static readonly IronOre              = Item.def('IronOre'             , '鉄鉱石'             , ItemCategory.Resource)
    public static readonly LightOil             = Item.def('LightOil'            , '軽油'               , ItemCategory.Intermediate)
    public static readonly PetroleumGas         = Item.def('PetroleumGas'        , 'プロパンガス'       , ItemCategory.Intermediate)
    public static readonly SulfuricAcid         = Item.def('SulfuricAcid'        , '硫酸'               , ItemCategory.Intermediate)
    public static readonly SolidFuel            = Item.def('SolidFuel'           , '固形燃料'           , ItemCategory.Intermediate)

    // 中間生産物 2
    public static readonly Water                = Item.def('Water'               , '水'                 , ItemCategory.Intermediate)

    // 中間生産物 3
    public static readonly Coal                 = Item.def('Coal'                , '石炭'               , ItemCategory.Resource)
    public static readonly IronPlate            = Item.def('IronPlate'           , '鉄板'               , ItemCategory.Intermediate)
    public static readonly CopperPlate          = Item.def('CopperPlate'         , '銅板'               , ItemCategory.Intermediate)
    public static readonly SteelPlate           = Item.def('SteelPlate'          , '鋼材'               , ItemCategory.Intermediate)
    public static readonly Sulfur               = Item.def('Sulfur'              , '硫黄'               , ItemCategory.Intermediate)
    public static readonly PlasticBar           = Item.def('PlasticBar'          , 'プラスチック棒'     , ItemCategory.Intermediate)

    // 中間生産物 5
    public static readonly CopperCable          = Item.def('CopperCable'         , '銅線'               , ItemCategory.Intermediate)
    public static readonly IronGearWheel        = Item.def('IronGearWheel'       , '歯車'               , ItemCategory.Intermediate)
    public static readonly ElectronicCircuit    = Item.def('ElectronicCircuit'   , '電子基板'           , ItemCategory.Intermediate)
    public static readonly AdvancedCircuit      = Item.def('AdvancedCircuit'     , '発展基板'           , ItemCategory.Intermediate)
    public static readonly ProcessingUnit       = Item.def('ProcessingUnit'      , '制御基板'           , ItemCategory.Intermediate)

    // 中間生産物 6
    public static readonly Battery              = Item.def('Battery'             , '電池'               , ItemCategory.Intermediate)
    public static readonly LowDensityStructure  = Item.def('LowDensityStructure' , '断熱材'             , ItemCategory.Intermediate)
    public static readonly RocketFuel           = Item.def('RocketFuel'          , 'ロケット燃料'       , ItemCategory.Intermediate)
    public static readonly RocketControlUnit    = Item.def('RocketControlUnit'   , 'ロケット制御装置'   , ItemCategory.Intermediate)
    public static readonly Satellite            = Item.def('Satellite'           , '人工衛星'           , ItemCategory.Intermediate)
    public static readonly RocketPart           = Item.def('RocketPart'          , 'ロケットパーツ'     , ItemCategory.Intermediate)

    // 戦闘 7
    public static readonly RocketSilo           = Item.def('RocketSilo'          , 'ロケットサイロ'     , ItemCategory.Combat)
    public static readonly Radar                = Item.def('Radar'               , 'レーダー'           , ItemCategory.Combat)
    public static readonly Rocket               = Item.def('Rocket'              , 'ロケット'           , ItemCategory.Combat)

    // テンプレート
    public static readonly _           = Item.def('_'          , '_'     , ItemCategory.Production)
}

class Module {
    private _item: Item;
    private _speedPercent: number;
    private _productivityPercent: number;

    private constructor(item: Item, speedPercent: number, productivityPercent: number)
    {
        this._item = item;
        this._speedPercent = speedPercent;
        this._productivityPercent = productivityPercent;
    }

    public get item(): Item { return this._item; }
    public get speedPercent(): number { return this._speedPercent; }

    public static SpeedModule1 = new Module(Item.SpeedModule1, 20, 0);
    public static ProductivityModule3 = new Module(Item.ProductivityModule3, -15, 10)
}

/** 材料になるアイテムと個数のペアを表します。 */
class Material {
    _item: Item;
    _number: number;

    constructor(item: Item, number: number) {
        this._item = item;
        this._number = number;
    }

    get item(): Item { return this._item; }
    get number(): number { return this._number; }
}

/** 一つのアイテムを製造するための一つのレシピを表します。 */
class Recipe {
    _product: Item;
    _number: number;
    _time: number;
    _producers: ProducerCategory[];
    _materials: Material[];

    private constructor(product: Item, number: number, time: number, producers: ProducerCategory[], ...materials: Material[]) {
        this._product = product;
        this._number = number;
        this._time = time;
        this._producers = producers;
        this._materials = materials;
    }

    /** 産出物 */
    get product(): Item { return this._product; }

    /** 産出数 */
    get number(): number { return this._number; }

    /** 所要時間 */
    get time(): number { return this._time; }

    /** 生産可能施設 */
    get producers(): ProducerCategory[] { return this._producers; }

    /** 素材 */
    get materials(): Material[] { return this._materials; }

    /**
     * 指定のアイテムを作成するためのレシピを見つけます。
     * @param target 作成したいアイテム。
     */
    static find(target: Item): Recipe[] {
        Recipe.initialize();
        let found = Recipe._map[target.name];
        if (found) {
            return found;
        }
        else {
            return [];
        }
    }

    private static _map: { [itemName: string]: Recipe[] } = undefined;
    
    private static initialize() {
        if (Recipe._map) {
            return;
        }

        Recipe._map = {}

        function r(product: Item, number: number, time: number, producers: ProducerCategory[], ...materials: Material[]) {
            let recipe = new Recipe(product, number, time, producers, ...materials);
            if (Recipe._map[recipe.product.name]) {
                Recipe._map[recipe.product.name].push(recipe);
            }
            else {
                Recipe._map[recipe.product.name] = [recipe];
            }
        }

        function m(item: Item, number: number) {
            return new Material(item, number);
        }

        // Hand and AssemblingMachine
        var H = [ProducerCategory.Hand, ProducerCategory.AssemblingMachine];
        // AssemblingMachine only
        var A = [ProducerCategory.AssemblingMachine];
        // ChemicalPlant only
        var C = [ProducerCategory.ChemicalPlant];
        // Furnace only
        var F = [ProducerCategory.Furnace];
        // RocketSilo
        var R = [ProducerCategory.RocketSilo];

        // Item                    ,  N,  sec
        r( Item.AdvancedCircuit    ,  1,  6  , H, m(Item.CopperCable        ,   4), m(Item.ElectronicCircuit  ,   2), m(Item.PlasticBar         ,   2) )
        r( Item.CopperCable        ,  2,  0.5, H, m(Item.CopperPlate        ,   1)                                                                     )
        r( Item.ElectronicCircuit  ,  1,  0.5, H, m(Item.CopperCable        ,   3), m(Item.IronPlate          ,   1)                                   )
        r( Item.PlasticBar         ,  2,  1  , C, m(Item.Coal               ,   1), m(Item.PetroleumGas       ,  20)                                   )
        r( Item.LowDensityStructure,  1, 30  , H, m(Item.CopperPlate        ,   5), m(Item.PlasticBar         ,   5), m(Item.SteelPlate         ,  10) )
        r( Item.SteelPlate         ,  1, 17.5, F, m(Item.IronPlate          ,   5)                                                                     )
        r( Item.RocketFuel         ,  1, 30  , H, m(Item.SolidFuel          ,  10)                                                                     )
        r( Item.SolidFuel          ,  1,  3  , C, m(Item.LightOil           ,  10)                                                                     )
        r( Item.RocketControlUnit  ,  1, 30  , H, m(Item.ProcessingUnit     ,   1), m(Item.SpeedModule1       ,   1)                                   )
        r( Item.ProcessingUnit     ,  1, 10  , H, m(Item.AdvancedCircuit    ,   2), m(Item.ElectronicCircuit  ,  20), m(Item.SulfuricAcid       ,   5) )
        r( Item.SpeedModule1       ,  1, 15  , H, m(Item.AdvancedCircuit    ,   5), m(Item.ElectronicCircuit  ,   5),                                  )
        r( Item.SulfuricAcid       , 50,  1  , C, m(Item.IronPlate          ,   1), m(Item.Sulfur             ,   5), m(Item.Water              , 100) )
        r( Item.RocketPart         ,  1,  3  , R, m(Item.LowDensityStructure,  10), m(Item.RocketControlUnit  ,  10), m(Item.RocketFuel         ,  10) )
        r( Item.Rocket             ,  1,  1  , R, m(Item.RocketPart         , 100), m(Item.Satellite          ,   1)                                   )
        r( Item.Satellite          ,  1,  3  , H, m(Item.Accumulator        , 100), m(Item.LowDensityStructure, 100), m(Item.ProcessingUnit     , 100), m(Item.Radar, 5), m(Item.RocketFuel, 50), m(Item.SolarPanel, 100) )
        r( Item.Accumulator        ,  1, 10  , H, m(Item.Battery            ,   5), m(Item.IronPlate          ,   2)                                   )
        r( Item.Battery            ,  1,  5  , C, m(Item.CopperPlate        ,   1), m(Item.IronPlate          ,   1), m(Item.SulfuricAcid       ,  20) )
        r( Item.SolarPanel         ,  1, 10  , H, m(Item.CopperPlate        ,   5), m(Item.ElectronicCircuit  ,  15), m(Item.SteelPlate         ,   5) )
        r( Item.Radar              ,  1,  0.5, H, m(Item.ElectronicCircuit  ,   5), m(Item.IronGearWheel      ,   5), m(Item.IronPlate          ,  10) )
        r( Item.Sulfur             ,  2,  1  , C, m(Item.PetroleumGas       ,  30), m(Item.Water              ,  30)                                   )
    }
}

/** 計算に用いる設定を表します。 */
class CalculationSettings {
    private _producerMap: Map<Item, Producer>;

    public constructor(producerMap?: Map<Item, Producer>) {
        this._producerMap = producerMap;
    }

    public getProducer(recipe: Recipe): Producer {
        if (this._producerMap && this._producerMap.has(recipe.product)) {
            return this._producerMap.get(recipe.product);
        }

        if (0 <= recipe.producers.indexOf(ProducerCategory.AssemblingMachine)) {
            return new Producer(Item.AssemblingMachine3);
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.ChemicalPlant)) {
            return new Producer(Item.ChemicalPlant);
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.Furnace)) {
            return new Producer(Item.ElectricFurnace);
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.RocketSilo)) {
            return new Producer(Item.RocketSilo);
        }
        else {
            return null;
        }
    }
}

class RecipeNode {
    private _product: Item;
    private _recipe: Recipe; // product がこれ以上分解できない場合は null

    private _needNumber: number; // 親ノードのアイテムを作るために必要な数
    private _numberPerSecond: number;
    private _producer: Producer;
    private _numProducers: number;
    // 要素数は recipe の materials の要素数と一致する。
    // recipe が null の場合でも null にはならず、空配列になる。
    private _materials: RecipeNode[];

    private _maxDepth: number;
    private _maxBreadth: number;

    protected constructor(product: Item, needNumber: number, numberPerSecond: number, settings: CalculationSettings) {
        this._product = product;
        this._needNumber = needNumber;
        this._numberPerSecond = numberPerSecond;
        this._materials = []

        const recipes = Recipe.find(product);
        if (recipes.length != 0) {
            // 素材のレシピを再帰的に列挙
            this._recipe = recipes[0]
            for (const material of this._recipe.materials) {
                const number = material.number;
                const consumingMaterialsPerSecond = this._numberPerSecond / this._recipe.number * number;
                this._materials.push(new RecipeNode(material.item, material.number, consumingMaterialsPerSecond, settings));
            }
        }
        else {
            // product はこれ以上分解できない
            this._recipe = null;
        }

        if (this._recipe) {
            this._producer = settings.getProducer(this._recipe);
            this._numProducers = this._numberPerSecond * this._recipe.time / this._recipe.number / this._producer.craftingSpeed;
        }
        else {
            this._producer = null;
            this._numProducers = 0;
        }

        this._maxDepth = 1;
        for (let material of this._materials) {
            let maxDepth = material.maxDepth + 1;
            if (this._maxDepth < maxDepth) {
                this._maxDepth = maxDepth;
            }
        }

        if (this._materials.length == 0) {
            this._maxBreadth = 1;
        }
        else {
            this._maxBreadth = 0;
            for (let material of this._materials) {
                this._maxBreadth += material.maxBreadth;
            }
        }
    }

    public get product(): Item { return this._product; }

    public get recipe(): Recipe { return this._recipe; }

    public get needNumber(): number { return this._needNumber; }

    public get numberPerSecond(): number { return this._numberPerSecond; }

    public get producer(): Producer { return this._producer; }

    public get numProducers(): number { return this._numProducers; }

    /** 現在のアイテムがこれ以上分解できない場合は空の配列を返します。 */
    public get materials(): RecipeNode[] { return this._materials; }

    /** 横方向の最大ノード数。 */
    public get maxDepth(): number { return this._maxDepth; }

    /** 縦方向の最大ノード数。 */
    public get maxBreadth(): number { return this._maxBreadth; }

    /**
     * 深さ優先ですべてのノードに対して visitor を適用します。
     * 現在のノード自身も列挙されます。
     * @param visitor
     *      depth は 1 から始まります。
     */
    public visitDepthFirst(visitor: (node: RecipeNode, depth: number) => void) {
        this.applyVisitorDepthFirst(visitor, 1);
    }

    private applyVisitorDepthFirst(visitor: (node: RecipeNode, depth: number) => void, depth: number) {
        visitor(this, depth);
        for (let material of this.materials) {
            material.applyVisitorDepthFirst(visitor, depth + 1);
        }
    }
}

/**
 * 特定のアイテムを目標のスピードで作成するためのレシピ群を表します。
 */
class RecipeGraph extends RecipeNode {
    public constructor(product: Item, numberPerSecond: number, settings: CalculationSettings) {
        const needNumber = 1;
        super(product, needNumber, numberPerSecond, settings);
    }
}

/**
 * TotalTable の一行分の情報。
 */
class TotalTableRow {
    private _item: Item;
    private _numberPerSecond: number;
    private _procuder: Producer;
    private _numProducers: number;

    public constructor(item: Item, numberPerSecond: number, producer: Producer, numProducers: number) {
        this._item = item;
        this._numberPerSecond = numberPerSecond;
        this._procuder = producer;
        this._numProducers = numProducers;
    }

    public get item(): Item { return this._item; }
    public get numberPerSecond(): number { return this._numberPerSecond; }
    public get producer(): Producer { return this._procuder; }
    public get numProducers(): number { return this._numProducers; }
}

/**
 * RecipeGraph に含まれる要素の総計。
 */
class TotalTable implements Iterable<TotalTableRow> {
    private _rows: TotalTableRow[];

    public constructor(graph: RecipeGraph) {
        // [0]: アイテム
        // [1]: 秒間必要数
        // [2]: 組立機
        // [3]: 必要組立機数
        let stats: { [itemName: string]: [Item, number, Producer, number] } = {}
        graph.visitDepthFirst((node: RecipeNode, depth: number) => {
            if (!stats[node.product.name]) {
                stats[node.product.name] = [node.product, node.numberPerSecond, node.producer, node.numProducers];
            }
            else {
                stats[node.product.name][1] += node.numberPerSecond;
                stats[node.product.name][3] += node.numProducers;
            }
        });

        this._rows = [];
        for (const itemName in stats) {
            const stat = stats[itemName];
            this._rows.push(new TotalTableRow(stat[0], stat[1], stat[2], stat[3]));
        }

        this._rows.sort((a, b) => {
            if (a.item.sortOrder < b.item.sortOrder) {
                return -1;
            }
            if (a.item.sortOrder > b.item.sortOrder) {
                return 1;
            }
            return 0;
        });
    }

    [Symbol.iterator]() {
        let index = 0;
        let rows = this._rows;
        
        return {
            next(): IteratorResult<TotalTableRow> {
                if (index < rows.length) {
                    return {
                        done: false,
                        value: rows[index++]
                    }
                }
                else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }
}

/**
 * 小数部の最大桁数を指定して、数値を文字列化します。
 * @param n 文字列化する対象の数値。
 * @param maxFractionDigits 文字列化した際の小数部の最大桁数。
 */
function formatNumber(n: number, maxFractionDigits: number): string {
    let s = n.toFixed(maxFractionDigits);
    if (s.indexOf('.') < 0) {
        return s;
    }
    while (s[s.length - 1] == '0') {
        s = s.substr(0, s.length - 1);
    }
    if (s[s.length - 1] == '.') {
        s = s.substr(0, s.length - 1);
    }
    return s;
}

enum IconSize {
    Small,
    Medium,
}

/**
 * アイテムアイコンを表示する <img> 要素を作成します。
 * @param item 表示するアイテム。
 */
function createImageOfItemIcon(item: Item, iconSize: IconSize = IconSize.Medium): HTMLImageElement {
    let img = document.createElement("img");
    img.src = "images/item-icons/" + item.name + ".png";
    img.width = (iconSize == IconSize.Medium) ? 25 : 16;
    img.alt = item.label;
    return img;
}

/**
 * アイテムアイコンと個数を表示する要素を作成します。
 */
function createElementOfItems(item: Item, numItems: number): HTMLElement {
    let div = document.createElement("div");

    let img = createImageOfItemIcon(item);
    div.appendChild(img);
    img.style.verticalAlign = "middle";

    let p = document.createElement("div");
    div.appendChild(p);
    p.style.display = "inline-block";
    p.style.verticalAlign = "middle";
    p.style.marginLeft = "0.25em"
    p.innerText = "×" + formatNumber(numItems, 2);

    return div;
}

/**
 * 製作機と個数を表示する要素を作成します。
 * モジュール表示されます。
 */
function createElementOfProducers(producer: Producer, numProducers: number): HTMLElement {
    let div = document.createElement("div");

    let img = createImageOfItemIcon(producer.item);
    div.appendChild(img);
    img.style.verticalAlign = "middle";

    // モジュール
    for (const module of producer.modules) {
        let img = createImageOfItemIcon(module.item, IconSize.Small);
        div.appendChild(img);
    }

    let p = document.createElement("div");
    div.appendChild(p);
    p.style.display = "inline-block";
    p.style.verticalAlign = "middle";
    p.style.marginLeft = "0.25em"
    p.innerText = "×" + formatNumber(numProducers, 2);

    return div;
}

class Greeter {
    element: HTMLElement;
    //span: HTMLElement;
    //timerToken: number;

    constructor(element: HTMLElement) {
        this.element = element;
        //this.element.innerHTML += "The time is: ";
        //this.span = document.createElement('span');
        //this.element.appendChild(this.span);
        //this.span.innerText = new Date().toUTCString();
    }

    start() {
        //this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);

        let graph = new RecipeGraph(Item.Rocket, 1 / 2000, new CalculationSettings(
            new Map<Item, Producer>([
                [ Item.LowDensityStructure, new Producer(Item.AssemblingMachine3, [Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3]) ],
                [ Item.RocketControlUnit, new Producer(Item.AssemblingMachine3, [Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3]) ],
                [ Item.RocketFuel, new Producer(Item.AssemblingMachine3, [Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3]) ],
            ])
        ));

        // 生産時間と生産数を表示するか？
        const showDetails = false;

        // グラフ
        {
            let table = document.createElement('table');
            this.element.appendChild(table);

            // テーブルヘッダ
            {
                let tHead = table.createTHead();
                let row = tHead.insertRow();
                for (let i = 0; i < graph.maxDepth; ++i) {
                    row.insertCell().innerHTML = i == 0 ? 'Product' : 'Material';
                    if (showDetails) {
                        row.insertCell().innerHTML = 'Sec';
                        row.insertCell().innerHTML = 'Production';
                    }
                    row.insertCell().innerHTML = '/sec';

                    let cell = row.insertCell();
                    cell.innerHTML = 'Producers';
                    cell.style.borderRight = "solid 2px #000";
                }
            }

            // テーブルボディ
            let tBody = table.createTBody()
            let prevDepth = 0;
            let currentRow: HTMLTableRowElement = tBody.insertRow();
            let stack: RecipeNode[] = [];
            graph.visitDepthFirst((node: RecipeNode, depth: number) => {
                if (depth <= prevDepth) {
                    currentRow = tBody.insertRow();
                }

                // アイテムアイコン＆必要数
                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;

                    if (depth == 1) {
                        cell.appendChild(createImageOfItemIcon(node.product));
                    }
                    else {
                        cell.appendChild(createElementOfItems(node.product, node.needNumber))
                    }
                }
                // 必要時間
                if (showDetails) {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    if (node.recipe) {
                        cell.innerText = node.recipe.time.toString() + " sec";
                    }
                    else {
                        cell.innerHTML = "";
                    }
                }
                // 生産数
                if (showDetails) {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    if (node.recipe) {
                        cell.innerText = node.recipe.number.toString();
                    }
                    else {
                        cell.innerText = "";
                    }
                }
                // 必要数/sec 
                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.innerText = formatNumber(node.numberPerSecond, 2);
                }
                // 組立機数
                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.style.borderRight = "solid 2px #000";

                    if (node.producer) {
                        cell.appendChild(createElementOfProducers(node.producer, node.numProducers));
                    }
                }

                prevDepth = depth;
            });
        }

        // 総計
        {
            const total = new TotalTable(graph);

            let table = document.createElement('table');
            this.element.appendChild(table);

            let tHead = table.createTHead();
            {
                let row = tHead.insertRow();
                row.insertCell().innerText = "Item";
                row.insertCell().innerText = "/sec";
                row.insertCell().innerText = "Producers";
            }

            let tBody = table.createTBody();
            for (const totalRow of total) {
                let row = tBody.insertRow();
                row.insertCell().appendChild(createImageOfItemIcon(totalRow.item));
                row.insertCell().innerText = formatNumber(totalRow.numberPerSecond, 2);
                if (totalRow.producer) {
                    row.insertCell().appendChild(createElementOfProducers(totalRow.producer, totalRow.numProducers));
                }
                else {
                    row.insertCell();
                }
            }
        }
    }

    stop() {
        //clearTimeout(this.timerToken);
    }

}

window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};