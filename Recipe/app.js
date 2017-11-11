var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/** 製造手段。 */
var ProducerCategory;
(function (ProducerCategory) {
    ProducerCategory[ProducerCategory["Hand"] = 0] = "Hand";
    ProducerCategory[ProducerCategory["AssemblingMachine"] = 1] = "AssemblingMachine";
    ProducerCategory[ProducerCategory["ChemicalPlant"] = 2] = "ChemicalPlant";
    ProducerCategory[ProducerCategory["Furnace"] = 3] = "Furnace";
})(ProducerCategory || (ProducerCategory = {}));
var Module = (function () {
    function Module() {
    }
    return Module;
}());
var Producer = (function () {
    function Producer(item) {
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
    Object.defineProperty(Producer.prototype, "item", {
        get: function () { return this._item; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "baseCraftingSpeed", {
        get: function () { return this._baseCraftingSpeed; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "craftingSpeed", {
        get: function () { return this.baseCraftingSpeed; },
        enumerable: true,
        configurable: true
    });
    return Producer;
}());
/** アイテムの分類。 */
var ItemCategory;
(function (ItemCategory) {
    ItemCategory[ItemCategory["Resource"] = 0] = "Resource";
    ItemCategory[ItemCategory["Logistics"] = 1] = "Logistics";
    ItemCategory[ItemCategory["Production"] = 2] = "Production";
    ItemCategory[ItemCategory["Intermediate"] = 3] = "Intermediate";
    ItemCategory[ItemCategory["Combat"] = 4] = "Combat";
})(ItemCategory || (ItemCategory = {}));
/** 一つのアイテムを表します。 */
var Item = (function () {
    function Item(name, label, category) {
        this._name = name;
        this._label = label;
        this._category = category;
    }
    Object.defineProperty(Item.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "label", {
        get: function () { return this._label; },
        enumerable: true,
        configurable: true
    });
    Item.prototype.equals = function (other) {
        return this.name == other.name;
    };
    return Item;
}());
Item.IronOre = new Item('IronOre', '鉄鉱石', ItemCategory.Resource);
Item.IronPlate = new Item('IronPlate', '鉄板', ItemCategory.Intermediate);
Item.AdvancedCircuit = new Item('AdvancedCircuit', '発展基板', ItemCategory.Intermediate);
Item.CopperCable = new Item('CopperCable', '銅線', ItemCategory.Intermediate);
Item.ElectronicCircuit = new Item('ElectronicCircuit', '電子基板', ItemCategory.Intermediate);
Item.PlasticBar = new Item('PlasticBar', 'プラスチック棒', ItemCategory.Intermediate);
Item.CopperPlate = new Item('CopperPlate', '銅板', ItemCategory.Intermediate);
Item.Coal = new Item('Coal', '石炭', ItemCategory.Resource);
Item.PetroleumGas = new Item('PetroleumGas', 'プロパンガス', ItemCategory.Intermediate);
Item.LowDensityStructure = new Item('LowDensityStructure', '断熱材', ItemCategory.Intermediate);
Item.SteelPlate = new Item('SteelPlate', '鋼材', ItemCategory.Intermediate);
Item.RocketFuel = new Item('RocketFuel', 'ロケット燃料', ItemCategory.Intermediate);
Item.SolidFuel = new Item('SolidFuel', '固形燃料', ItemCategory.Intermediate);
Item.LightOil = new Item('LightOil', '軽油', ItemCategory.Intermediate);
Item.RocketControlUnit = new Item('RocketControlUnit', 'ロケット制御装置', ItemCategory.Intermediate);
Item.ProcessingUnit = new Item('ProcessingUnit', '制御基板', ItemCategory.Intermediate);
Item.SpeedModule1 = new Item('SpeedModule1', '生産速度モジュール1', ItemCategory.Production);
Item.SulfuricAcid = new Item('SulfuricAcid', '硫酸', ItemCategory.Intermediate);
Item.Sulfur = new Item('Sulfur', '硫黄', ItemCategory.Intermediate);
Item.Water = new Item('Water', '水', ItemCategory.Intermediate);
Item.AssemblingMachine1 = new Item('AssemblingMachine1', '組立機1', ItemCategory.Production);
Item.AssemblingMachine2 = new Item('AssemblingMachine2', '組立機2', ItemCategory.Production);
Item.AssemblingMachine3 = new Item('AssemblingMachine3', '組立機3', ItemCategory.Production);
Item.ElectricFurnace = new Item('ElectricFurnace', '電気炉', ItemCategory.Production);
Item.ChemicalPlant = new Item('ChemicalPlant', '化学プラント', ItemCategory.Production);
/** 材料になるアイテムと個数のペアを表します。 */
var Material = (function () {
    function Material(item, number) {
        this._item = item;
        this._number = number;
    }
    Object.defineProperty(Material.prototype, "item", {
        get: function () { return this._item; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Material.prototype, "number", {
        get: function () { return this._number; },
        enumerable: true,
        configurable: true
    });
    return Material;
}());
/** 一つのアイテムを製造するための一つのレシピを表します。 */
var Recipe = (function () {
    function Recipe(product, number, time, producers) {
        var materials = [];
        for (var _i = 4; _i < arguments.length; _i++) {
            materials[_i - 4] = arguments[_i];
        }
        this._product = product;
        this._number = number;
        this._time = time;
        this._producers = producers;
        this._materials = materials;
    }
    Object.defineProperty(Recipe.prototype, "product", {
        /** 産出物 */
        get: function () { return this._product; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Recipe.prototype, "number", {
        /** 産出数 */
        get: function () { return this._number; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Recipe.prototype, "time", {
        /** 所要時間 */
        get: function () { return this._time; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Recipe.prototype, "producers", {
        /** 生産可能施設 */
        get: function () { return this._producers; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Recipe.prototype, "materials", {
        /** 素材 */
        get: function () { return this._materials; },
        enumerable: true,
        configurable: true
    });
    /**
     * 指定のアイテムを作成するためのレシピを見つけます。
     * @param target 作成したいアイテム。
     */
    Recipe.find = function (target) {
        Recipe.initialize();
        var found = Recipe._map[target.name];
        if (found) {
            return found;
        }
        else {
            return [];
        }
    };
    Recipe.initialize = function () {
        if (Recipe._map) {
            return;
        }
        Recipe._map = {};
        function r(product, number, time, producers) {
            var materials = [];
            for (var _i = 4; _i < arguments.length; _i++) {
                materials[_i - 4] = arguments[_i];
            }
            var recipe = new (Recipe.bind.apply(Recipe, [void 0, product, number, time, producers].concat(materials)))();
            if (Recipe._map[recipe.product.name]) {
                Recipe._map[recipe.product.name].push(recipe);
            }
            else {
                Recipe._map[recipe.product.name] = [recipe];
            }
        }
        function m(item, number) {
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
        r(Item.AdvancedCircuit, 1, 6, H, m(Item.CopperCable, 4), m(Item.ElectronicCircuit, 2), m(Item.PlasticBar, 2));
        r(Item.CopperCable, 2, 0.5, H, m(Item.CopperPlate, 1));
        r(Item.ElectronicCircuit, 1, 0.5, H, m(Item.CopperCable, 3), m(Item.IronPlate, 1));
        r(Item.PlasticBar, 2, 1, C, m(Item.Coal, 1), m(Item.PetroleumGas, 20));
        r(Item.LowDensityStructure, 1, 30, H, m(Item.CopperPlate, 5), m(Item.PlasticBar, 5), m(Item.SteelPlate, 10));
        r(Item.SteelPlate, 1, 17.5, F, m(Item.IronPlate, 5));
        r(Item.RocketFuel, 1, 30, H, m(Item.SolidFuel, 10));
        r(Item.SolidFuel, 1, 3, C, m(Item.LightOil, 10));
        r(Item.RocketControlUnit, 1, 30, H, m(Item.ProcessingUnit, 1), m(Item.SpeedModule1, 1));
        r(Item.ProcessingUnit, 1, 10, H, m(Item.AdvancedCircuit, 2), m(Item.ElectronicCircuit, 20), m(Item.SulfuricAcid, 5));
        r(Item.SpeedModule1, 1, 15, H, m(Item.AdvancedCircuit, 5), m(Item.ElectronicCircuit, 5));
        r(Item.SulfuricAcid, 50, 1, C, m(Item.IronPlate, 1), m(Item.Sulfur, 5), m(Item.Water, 100));
    };
    return Recipe;
}());
Recipe._map = undefined;
/** 計算に用いる設定を表します。 */
var CalculationSettings = (function () {
    function CalculationSettings() {
    }
    CalculationSettings.prototype.getProductionSpeed = function (recipe) {
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
    };
    CalculationSettings.prototype.getProducer = function (recipe) {
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
    };
    return CalculationSettings;
}());
var RecipeNode = (function () {
    function RecipeNode(product, needNumber, numberPerSecond, settings) {
        this._product = product;
        this._needNumber = needNumber;
        this._numberPerSecond = numberPerSecond;
        this._materials = [];
        var recipes = Recipe.find(product);
        if (recipes.length != 0) {
            // 素材のレシピを再帰的に列挙
            this._recipe = recipes[0];
            for (var _i = 0, _a = this._recipe.materials; _i < _a.length; _i++) {
                var material = _a[_i];
                var number = material.number;
                var consumingMaterialsPerSecond = this._numberPerSecond / this._recipe.number * number;
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
        for (var _b = 0, _c = this._materials; _b < _c.length; _b++) {
            var material = _c[_b];
            var maxDepth = material.maxDepth + 1;
            if (this._maxDepth < maxDepth) {
                this._maxDepth = maxDepth;
            }
        }
        if (this._materials.length == 0) {
            this._maxBreadth = 1;
        }
        else {
            this._maxBreadth = 0;
            for (var _d = 0, _e = this._materials; _d < _e.length; _d++) {
                var material = _e[_d];
                this._maxBreadth += material.maxBreadth;
            }
        }
    }
    Object.defineProperty(RecipeNode.prototype, "product", {
        get: function () { return this._product; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "recipe", {
        get: function () { return this._recipe; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "needNumber", {
        get: function () { return this._needNumber; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "numberPerSecond", {
        get: function () { return this._numberPerSecond; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "producer", {
        get: function () { return this._producer; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "numProducers", {
        get: function () { return this._numProducers; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "materials", {
        /** 現在のアイテムがこれ以上分解できない場合は空の配列を返します。 */
        get: function () { return this._materials; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "maxDepth", {
        /** 横方向の最大ノード数。 */
        get: function () { return this._maxDepth; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RecipeNode.prototype, "maxBreadth", {
        /** 縦方向の最大ノード数。 */
        get: function () { return this._maxBreadth; },
        enumerable: true,
        configurable: true
    });
    /**
     * 深さ優先ですべてのノードに対して visitor を適用します。
     * 現在のノード自身も列挙されます。
     * @param visitor
     *      depth は 1 から始まります。
     */
    RecipeNode.prototype.visitDepthFirst = function (visitor) {
        this.applyVisitorDepthFirst(visitor, 1);
    };
    RecipeNode.prototype.applyVisitorDepthFirst = function (visitor, depth) {
        visitor(this, depth);
        for (var _i = 0, _a = this.materials; _i < _a.length; _i++) {
            var material = _a[_i];
            material.applyVisitorDepthFirst(visitor, depth + 1);
        }
    };
    return RecipeNode;
}());
/**
 * 特定のアイテムを目標のスピードで作成するためのレシピ群を表します。
 */
var RecipeGraph = (function (_super) {
    __extends(RecipeGraph, _super);
    function RecipeGraph(product, numberPerSecond, settings) {
        var _this = this;
        var needNumber = 1;
        _this = _super.call(this, product, needNumber, numberPerSecond, settings) || this;
        return _this;
    }
    return RecipeGraph;
}(RecipeNode));
/**
 * TotalTable の一行分の情報。
 */
var TotalTableRow = (function () {
    function TotalTableRow(item, numberPerSecond, producer, numProducers) {
        this._item = item;
        this._numberPerSecond = numberPerSecond;
        this._procuder = producer;
        this._numProducers = numProducers;
    }
    Object.defineProperty(TotalTableRow.prototype, "item", {
        get: function () { return this._item; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TotalTableRow.prototype, "numberPerSecond", {
        get: function () { return this._numberPerSecond; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TotalTableRow.prototype, "producer", {
        get: function () { return this._procuder; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TotalTableRow.prototype, "numProducers", {
        get: function () { return this._numProducers; },
        enumerable: true,
        configurable: true
    });
    return TotalTableRow;
}());
/**
 * RecipeGraph に含まれる要素の総計。
 */
var TotalTable = (function () {
    function TotalTable(graph) {
        // [0]: アイテム
        // [1]: 秒間必要数
        // [2]: 組立機
        // [3]: 必要組立機数
        var stats = {};
        graph.visitDepthFirst(function (node, depth) {
            if (!stats[node.product.name]) {
                stats[node.product.name] = [node.product, node.numberPerSecond, node.producer, node.numProducers];
            }
            else {
                stats[node.product.name][1] += node.numberPerSecond;
                stats[node.product.name][3] += node.numProducers;
            }
        });
        this._rows = [];
        for (var itemName in stats) {
            var stat = stats[itemName];
            this._rows.push(new TotalTableRow(stat[0], stat[1], stat[2], stat[3]));
        }
    }
    return TotalTable;
}());
/**
 * 小数部の最大桁数を指定して、数値を文字列化します。
 * @param n 文字列化する対象の数値。
 * @param maxFractionDigits 文字列化した際の小数部の最大桁数。
 */
function formatNumber(n, maxFractionDigits) {
    var s = n.toFixed(maxFractionDigits);
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
function createImageOfItemIcon(item) {
    var img = document.createElement("img");
    img.src = "images/item-icons/" + item.name + ".png";
    img.width = 25;
    return img;
}
var Greeter = (function () {
    //span: HTMLElement;
    //timerToken: number;
    function Greeter(element) {
        this.element = element;
        //this.element.innerHTML += "The time is: ";
        //this.span = document.createElement('span');
        //this.element.appendChild(this.span);
        //this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        //this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
        var graph = new RecipeGraph(Item.RocketControlUnit, 0.5, new CalculationSettings);
        // [0]: アイテム、[1]: 秒間必要数、[2]: 必要組立機数
        var stats = {};
        graph.visitDepthFirst(function (node, depth) {
            if (!stats[node.product.name]) {
                stats[node.product.name] = [node.product, node.numberPerSecond, node.numProducers];
            }
            else {
                stats[node.product.name][1] += node.numberPerSecond;
                stats[node.product.name][2] += node.numProducers;
            }
        });
        // 生産時間と生産数を表示するか？
        var showDetails = false;
        {
            var table = document.createElement('table');
            this.element.appendChild(table);
            // テーブルヘッダ
            {
                var tHead = table.createTHead();
                var row = tHead.insertRow();
                for (var i = 0; i < graph.maxDepth; ++i) {
                    row.insertCell().innerHTML = i == 0 ? 'Product' : 'Material';
                    if (showDetails) {
                        row.insertCell().innerHTML = 'Sec';
                        row.insertCell().innerHTML = 'Production';
                    }
                    row.insertCell().innerHTML = '/sec';
                    var cell = row.insertCell();
                    cell.innerHTML = 'Producers';
                    cell.style.borderRight = "solid 2px #000";
                }
            }
            // テーブルボディ
            var tBody_1 = table.createTBody();
            var prevDepth_1 = 0;
            var currentRow_1 = tBody_1.insertRow();
            var stack = [];
            graph.visitDepthFirst(function (node, depth) {
                if (depth <= prevDepth_1) {
                    currentRow_1 = tBody_1.insertRow();
                }
                {
                    var cell = currentRow_1.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.appendChild(createImageOfItemIcon(node.product));
                    if (depth != 1) {
                        var p = document.createElement('p');
                        cell.appendChild(p);
                        p.style.display = "inline-block";
                        p.style.margin = "0";
                        p.style.marginLeft = "0.25em";
                        p.innerText += "×" + node.needNumber;
                    }
                }
                if (showDetails) {
                    var cell = currentRow_1.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    if (node.recipe) {
                        cell.innerText = node.recipe.time.toString() + " sec";
                    }
                    else {
                        cell.innerHTML = "";
                    }
                }
                if (showDetails) {
                    var cell = currentRow_1.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    if (node.recipe) {
                        cell.innerText = node.recipe.number.toString();
                    }
                    else {
                        cell.innerText = "";
                    }
                }
                {
                    var cell = currentRow_1.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.innerText = formatNumber(node.numberPerSecond, 2);
                }
                {
                    var cell = currentRow_1.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    cell.style.borderRight = "solid 2px #000";
                    if (node.producer) {
                        cell.appendChild(createImageOfItemIcon(node.producer.item));
                        var p = document.createElement('p');
                        cell.appendChild(p);
                        p.style.display = "inline-block";
                        p.style.margin = "0";
                        p.style.marginLeft = "0.25em";
                        p.innerText += "×" + formatNumber(node.numProducers, 2);
                    }
                }
                prevDepth_1 = depth;
            });
        }
        {
            var table = document.createElement('table');
            this.element.appendChild(table);
            var tHead = table.createTHead();
            {
                var row = tHead.insertRow();
                row.insertCell().innerText = "Item";
                row.insertCell().innerText = "/sec";
                row.insertCell().innerText = "Producers";
            }
            var tBody = table.createTBody();
            for (var itemName in stats) {
                var stat = stats[itemName];
                var row = tBody.insertRow();
                row.insertCell().appendChild(createImageOfItemIcon(stat[0]));
                row.insertCell().innerText = formatNumber(stat[1], 2);
                row.insertCell().innerText = formatNumber(stat[2], 2);
            }
        }
    };
    Greeter.prototype.stop = function () {
        //clearTimeout(this.timerToken);
    };
    return Greeter;
}());
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map