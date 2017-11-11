/** 製造手段。 */
enum ProducerCategory {
    Hand,
    AssemblingMachine,
    ChemicalPlant,
    Furnace,
}

class Module {

}

class Producer {
    private _item: Item;
    private _baseCraftingSpeed: number;
    private _modules: Module[];    

    public constructor(item: Item) {
        this._item = item;
        this._modules = [];

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
    }

    public get item(): Item { return this._item; }
    public get baseCraftingSpeed(): number { return this._baseCraftingSpeed; }
    public get craftingSpeed(): number { return this.baseCraftingSpeed; }
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
    _name: string;
    _label: string;
    _category: ItemCategory;

    private constructor(name: string, label: string, category: ItemCategory) {
        this._name = name;
        this._label = label;
        this._category = category;
    }

    get name(): string { return this._name; }
    get label(): string { return this._label; }

    equals(other: Item): boolean {
        return this.name == other.name;
    }

    public static readonly IronOre              = new Item('IronOre'             , '鉄鉱石'             , ItemCategory.Resource)
    public static readonly IronPlate            = new Item('IronPlate'           , '鉄板'               , ItemCategory.Intermediate)
    public static readonly AdvancedCircuit      = new Item('AdvancedCircuit'     , '発展基板'           , ItemCategory.Intermediate)
    public static readonly CopperCable          = new Item('CopperCable'         , '銅線'               , ItemCategory.Intermediate)
    public static readonly ElectronicCircuit    = new Item('ElectronicCircuit'   , '電子基板'           , ItemCategory.Intermediate)
    public static readonly PlasticBar           = new Item('PlasticBar'          , 'プラスチック棒'     , ItemCategory.Intermediate)
    public static readonly CopperPlate          = new Item('CopperPlate'         , '銅板'               , ItemCategory.Intermediate)
    public static readonly Coal                 = new Item('Coal'                , '石炭'               , ItemCategory.Resource)
    public static readonly PetroleumGas         = new Item('PetroleumGas'        , 'プロパンガス'       , ItemCategory.Intermediate)
    public static readonly LowDensityStructure  = new Item('LowDensityStructure' , '断熱材'             , ItemCategory.Intermediate)
    public static readonly SteelPlate           = new Item('SteelPlate'          , '鋼材'               , ItemCategory.Intermediate)
    public static readonly RocketFuel           = new Item('RocketFuel'          , 'ロケット燃料'       , ItemCategory.Intermediate)
    public static readonly SolidFuel            = new Item('SolidFuel'           , '固形燃料'           , ItemCategory.Intermediate)
    public static readonly LightOil             = new Item('LightOil'            , '軽油'               , ItemCategory.Intermediate)
    public static readonly RocketControlUnit    = new Item('RocketControlUnit'   , 'ロケット制御装置'   , ItemCategory.Intermediate)
    public static readonly ProcessingUnit       = new Item('ProcessingUnit'      , '制御基板'           , ItemCategory.Intermediate)
    public static readonly SpeedModule1         = new Item('SpeedModule1'        , '生産速度モジュール1', ItemCategory.Production)
    public static readonly SulfuricAcid         = new Item('SulfuricAcid'        , '硫酸'               , ItemCategory.Intermediate)
    public static readonly Sulfur               = new Item('Sulfur'              , '硫黄'               , ItemCategory.Intermediate)
    public static readonly Water                = new Item('Water'               , '水'                 , ItemCategory.Intermediate)

    public static readonly AssemblingMachine1   = new Item('AssemblingMachine1'  , '組立機1'            , ItemCategory.Production)
    public static readonly AssemblingMachine2   = new Item('AssemblingMachine2'  , '組立機2'            , ItemCategory.Production)
    public static readonly AssemblingMachine3   = new Item('AssemblingMachine3'  , '組立機3'            , ItemCategory.Production)
    public static readonly ElectricFurnace      = new Item('ElectricFurnace'     , '電気炉'             , ItemCategory.Production)
    public static readonly ChemicalPlant        = new Item('ChemicalPlant'       , '化学プラント'       , ItemCategory.Production)
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

        //r( Item.IronPlate          , 1,  3.5, F, m(Item.IronOre            ,  1)                                                                   )
        r( Item.AdvancedCircuit    , 1,  6  , H, m(Item.CopperCable        ,  4), m(Item.ElectronicCircuit  ,  2), m(Item.PlasticBar         ,  2) )
        r( Item.CopperCable        , 2,  0.5, H, m(Item.CopperPlate        ,  1)                                                                   )
        r( Item.ElectronicCircuit  , 1,  0.5, H, m(Item.CopperCable        ,  3), m(Item.IronPlate          ,  1)                                  )
        r( Item.PlasticBar         , 2,  1  , C, m(Item.Coal               ,  1), m(Item.PetroleumGas       , 20)                                  )
        r( Item.LowDensityStructure, 1, 30  , H, m(Item.CopperPlate        ,  5), m(Item.PlasticBar         ,  5), m(Item.SteelPlate         , 10) )
        r( Item.SteelPlate         , 1, 17.5, F, m(Item.IronPlate          ,  5)                                                                   )
        r( Item.RocketFuel         , 1, 30  , H, m(Item.SolidFuel          , 10)                                                                   )
        r( Item.SolidFuel          , 1,  3  , C, m(Item.LightOil           , 10)                                                                   )
        r( Item.RocketControlUnit  , 1, 30  , H, m(Item.ProcessingUnit     ,  1), m(Item.SpeedModule1       ,  1)                                  )
        r( Item.ProcessingUnit     , 1, 10  , H, m(Item.AdvancedCircuit    ,  2), m(Item.ElectronicCircuit  , 20), m(Item.SulfuricAcid       ,  5) )
        r( Item.SpeedModule1       , 1, 15  , H, m(Item.AdvancedCircuit    ,  5), m(Item.ElectronicCircuit  ,  5),                                 )
        r( Item.SulfuricAcid       ,50,  1  , C, m(Item.IronPlate          ,  1), m(Item.Sulfur             ,  5), m(Item.Water              , 100))
    }
}

/** 計算に用いる設定を表します。 */
class CalculationSettings {
    public getProductionSpeed(recipe: Recipe): number {
        if (0 <= recipe.producers.indexOf(ProducerCategory.AssemblingMachine)) {
            return 0.75;
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.ChemicalPlant)) {
            return 1.25;
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.Furnace)) {
            return 2.0;
        }
        else {
            return 1.0;
        }
    }

    public getProducer(recipe: Recipe): Producer {
        if (0 <= recipe.producers.indexOf(ProducerCategory.AssemblingMachine)) {
            return new Producer(Item.AssemblingMachine3);
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.ChemicalPlant)) {
            return new Producer(Item.ChemicalPlant);
        }
        else if (0 <= recipe.producers.indexOf(ProducerCategory.Furnace)) {
            return new Producer(Item.ElectricFurnace);
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
class TotalTable {
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

/**
 * アイテムアイコンを表示するための <img> 要素を作成します。
 * @param item 表示するアイテム。
 */
function createImageOfItemIcon(item: Item): HTMLImageElement {
    let img = document.createElement("img");
    img.src = "images/item-icons/" + item.name + ".png";
    img.width = 25;
    return img;
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

        let graph = new RecipeGraph(Item.RocketControlUnit, 0.5, new CalculationSettings);

        // [0]: アイテム、[1]: 秒間必要数、[2]: 必要組立機数
        let stats: { [itemName: string]: [Item, number, number] } = {}
        graph.visitDepthFirst((node: RecipeNode, depth: number) => {
            if (!stats[node.product.name]) {
                stats[node.product.name] = [node.product, node.numberPerSecond, node.numProducers];
            }
            else {
                stats[node.product.name][1] += node.numberPerSecond;
                stats[node.product.name][2] += node.numProducers;
            }
        });

        // 生産時間と生産数を表示するか？
        const showDetails = false;

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

                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;

                    cell.appendChild(createImageOfItemIcon(node.product));

                    if (depth != 1) {
                        let p = document.createElement('p');
                        cell.appendChild(p)
                        p.style.display = "inline-block";
                        p.style.margin = "0";
                        p.style.marginLeft = "0.25em";
                        p.innerText += "×" + node.needNumber;
                    }
                }
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
                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.innerText = formatNumber(node.numberPerSecond, 2);
                }
                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.style.borderRight = "solid 2px #000";

                    if (node.producer) {
                        cell.appendChild(createImageOfItemIcon(node.producer.item));

                        let p = document.createElement('p');
                        cell.appendChild(p);
                        p.style.display = "inline-block";
                        p.style.margin = "0";
                        p.style.marginLeft = "0.25em";
                        p.innerText += "×" + formatNumber(node.numProducers, 2);
                    }
                }

                prevDepth = depth;
            });
        }

        {
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
            for (const itemName in stats) {
                const stat = stats[itemName];
                let row = tBody.insertRow();
                row.insertCell().appendChild(createImageOfItemIcon(stat[0]));
                row.insertCell().innerText = formatNumber(stat[1], 2);
                row.insertCell().innerText = formatNumber(stat[2], 2);
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