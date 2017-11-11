var ProducerCategory;
(function (ProducerCategory) {
    ProducerCategory[ProducerCategory["Hand"] = 0] = "Hand";
    ProducerCategory[ProducerCategory["AssemblingMachine"] = 1] = "AssemblingMachine";
    ProducerCategory[ProducerCategory["ChemicalPlant"] = 2] = "ChemicalPlant";
    ProducerCategory[ProducerCategory["Furnace"] = 3] = "Furnace";
    ProducerCategory[ProducerCategory["RocketSilo"] = 4] = "RocketSilo";
})(ProducerCategory || (ProducerCategory = {}));
class Producer {
    constructor(item, modules = []) {
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
    get item() { return this._item; }
    get baseCraftingSpeed() { return this._baseCraftingSpeed; }
    get craftingSpeed() { return this._craftingSpeed; }
    get modules() { return this._modules; }
}
var ItemCategory;
(function (ItemCategory) {
    ItemCategory[ItemCategory["Resource"] = 0] = "Resource";
    ItemCategory[ItemCategory["Logistics"] = 1] = "Logistics";
    ItemCategory[ItemCategory["Production"] = 2] = "Production";
    ItemCategory[ItemCategory["Intermediate"] = 3] = "Intermediate";
    ItemCategory[ItemCategory["Combat"] = 4] = "Combat";
})(ItemCategory || (ItemCategory = {}));
class Item {
    constructor(name, label, category, sortOrder) {
        this._name = name;
        this._label = label;
        this._category = category;
        this._sortOrder = sortOrder;
    }
    get name() { return this._name; }
    get label() { return this._label; }
    get sortOrder() { return this._sortOrder; }
    equals(other) {
        return this.name == other.name;
    }
    static def(name, label, category) {
        let item = new Item(name, label, category, Item._all.length);
        Item._all.push(item);
        return item;
    }
}
Item._all = [];
Item.SolarPanel = Item.def('SolarPanel', 'ソーラーパネル', ItemCategory.Production);
Item.Accumulator = Item.def('Accumulator', '蓄電池', ItemCategory.Production);
Item.ElectricFurnace = Item.def('ElectricFurnace', '電気炉', ItemCategory.Production);
Item.AssemblingMachine1 = Item.def('AssemblingMachine1', '組立機1', ItemCategory.Production);
Item.AssemblingMachine2 = Item.def('AssemblingMachine2', '組立機2', ItemCategory.Production);
Item.AssemblingMachine3 = Item.def('AssemblingMachine3', '組立機3', ItemCategory.Production);
Item.ChemicalPlant = Item.def('ChemicalPlant', '化学プラント', ItemCategory.Production);
Item.SpeedModule1 = Item.def('SpeedModule1', '生産速度モジュール1', ItemCategory.Production);
Item.ProductivityModule3 = Item.def('ProductivityModule3', '生産効率モジュール3', ItemCategory.Production);
Item.IronOre = Item.def('IronOre', '鉄鉱石', ItemCategory.Resource);
Item.LightOil = Item.def('LightOil', '軽油', ItemCategory.Intermediate);
Item.PetroleumGas = Item.def('PetroleumGas', 'プロパンガス', ItemCategory.Intermediate);
Item.SulfuricAcid = Item.def('SulfuricAcid', '硫酸', ItemCategory.Intermediate);
Item.SolidFuel = Item.def('SolidFuel', '固形燃料', ItemCategory.Intermediate);
Item.Water = Item.def('Water', '水', ItemCategory.Intermediate);
Item.Coal = Item.def('Coal', '石炭', ItemCategory.Resource);
Item.IronPlate = Item.def('IronPlate', '鉄板', ItemCategory.Intermediate);
Item.CopperPlate = Item.def('CopperPlate', '銅板', ItemCategory.Intermediate);
Item.SteelPlate = Item.def('SteelPlate', '鋼材', ItemCategory.Intermediate);
Item.Sulfur = Item.def('Sulfur', '硫黄', ItemCategory.Intermediate);
Item.PlasticBar = Item.def('PlasticBar', 'プラスチック棒', ItemCategory.Intermediate);
Item.CopperCable = Item.def('CopperCable', '銅線', ItemCategory.Intermediate);
Item.IronGearWheel = Item.def('IronGearWheel', '歯車', ItemCategory.Intermediate);
Item.ElectronicCircuit = Item.def('ElectronicCircuit', '電子基板', ItemCategory.Intermediate);
Item.AdvancedCircuit = Item.def('AdvancedCircuit', '発展基板', ItemCategory.Intermediate);
Item.ProcessingUnit = Item.def('ProcessingUnit', '制御基板', ItemCategory.Intermediate);
Item.Battery = Item.def('Battery', '電池', ItemCategory.Intermediate);
Item.LowDensityStructure = Item.def('LowDensityStructure', '断熱材', ItemCategory.Intermediate);
Item.RocketFuel = Item.def('RocketFuel', 'ロケット燃料', ItemCategory.Intermediate);
Item.RocketControlUnit = Item.def('RocketControlUnit', 'ロケット制御装置', ItemCategory.Intermediate);
Item.Satellite = Item.def('Satellite', '人工衛星', ItemCategory.Intermediate);
Item.RocketPart = Item.def('RocketPart', 'ロケットパーツ', ItemCategory.Intermediate);
Item.RocketSilo = Item.def('RocketSilo', 'ロケットサイロ', ItemCategory.Combat);
Item.Radar = Item.def('Radar', 'レーダー', ItemCategory.Combat);
Item.Rocket = Item.def('Rocket', 'ロケット', ItemCategory.Combat);
Item._ = Item.def('_', '_', ItemCategory.Production);
class Module {
    constructor(item, speedPercent, productivityPercent) {
        this._item = item;
        this._speedPercent = speedPercent;
        this._productivityPercent = productivityPercent;
    }
    get item() { return this._item; }
    get speedPercent() { return this._speedPercent; }
}
Module.SpeedModule1 = new Module(Item.SpeedModule1, 20, 0);
Module.ProductivityModule3 = new Module(Item.ProductivityModule3, -15, 10);
class Material {
    constructor(item, number) {
        this._item = item;
        this._number = number;
    }
    get item() { return this._item; }
    get number() { return this._number; }
}
class Recipe {
    constructor(product, number, time, producers, ...materials) {
        this._product = product;
        this._number = number;
        this._time = time;
        this._producers = producers;
        this._materials = materials;
    }
    get product() { return this._product; }
    get number() { return this._number; }
    get time() { return this._time; }
    get producers() { return this._producers; }
    get materials() { return this._materials; }
    static find(target) {
        Recipe.initialize();
        let found = Recipe._map[target.name];
        if (found) {
            return found;
        }
        else {
            return [];
        }
    }
    static initialize() {
        if (Recipe._map) {
            return;
        }
        Recipe._map = {};
        function r(product, number, time, producers, ...materials) {
            let recipe = new Recipe(product, number, time, producers, ...materials);
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
        var H = [ProducerCategory.Hand, ProducerCategory.AssemblingMachine];
        var A = [ProducerCategory.AssemblingMachine];
        var C = [ProducerCategory.ChemicalPlant];
        var F = [ProducerCategory.Furnace];
        var R = [ProducerCategory.RocketSilo];
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
        r(Item.RocketPart, 1, 3, R, m(Item.LowDensityStructure, 10), m(Item.RocketControlUnit, 10), m(Item.RocketFuel, 10));
        r(Item.Rocket, 1, 1, R, m(Item.RocketPart, 100), m(Item.Satellite, 1));
        r(Item.Satellite, 1, 3, H, m(Item.Accumulator, 100), m(Item.LowDensityStructure, 100), m(Item.ProcessingUnit, 100), m(Item.Radar, 5), m(Item.RocketFuel, 50), m(Item.SolarPanel, 100));
        r(Item.Accumulator, 1, 10, H, m(Item.Battery, 5), m(Item.IronPlate, 2));
        r(Item.Battery, 1, 5, C, m(Item.CopperPlate, 1), m(Item.IronPlate, 1), m(Item.SulfuricAcid, 20));
        r(Item.SolarPanel, 1, 10, H, m(Item.CopperPlate, 5), m(Item.ElectronicCircuit, 15), m(Item.SteelPlate, 5));
        r(Item.Radar, 1, 0.5, H, m(Item.ElectronicCircuit, 5), m(Item.IronGearWheel, 5), m(Item.IronPlate, 10));
        r(Item.Sulfur, 2, 1, C, m(Item.PetroleumGas, 30), m(Item.Water, 30));
    }
}
Recipe._map = undefined;
class CalculationSettings {
    constructor(producerMap) {
        this._producerMap = producerMap;
    }
    getProducer(recipe) {
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
    constructor(product, needNumber, numberPerSecond, settings) {
        this._product = product;
        this._needNumber = needNumber;
        this._numberPerSecond = numberPerSecond;
        this._materials = [];
        const recipes = Recipe.find(product);
        if (recipes.length != 0) {
            this._recipe = recipes[0];
            for (const material of this._recipe.materials) {
                const number = material.number;
                const consumingMaterialsPerSecond = this._numberPerSecond / this._recipe.number * number;
                this._materials.push(new RecipeNode(material.item, material.number, consumingMaterialsPerSecond, settings));
            }
        }
        else {
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
    get product() { return this._product; }
    get recipe() { return this._recipe; }
    get needNumber() { return this._needNumber; }
    get numberPerSecond() { return this._numberPerSecond; }
    get producer() { return this._producer; }
    get numProducers() { return this._numProducers; }
    get materials() { return this._materials; }
    get maxDepth() { return this._maxDepth; }
    get maxBreadth() { return this._maxBreadth; }
    visitDepthFirst(visitor) {
        this.applyVisitorDepthFirst(visitor, 1);
    }
    applyVisitorDepthFirst(visitor, depth) {
        visitor(this, depth);
        for (let material of this.materials) {
            material.applyVisitorDepthFirst(visitor, depth + 1);
        }
    }
}
class RecipeGraph extends RecipeNode {
    constructor(product, numberPerSecond, settings) {
        const needNumber = 1;
        super(product, needNumber, numberPerSecond, settings);
    }
}
class TotalTableRow {
    constructor(item, numberPerSecond, producer, numProducers) {
        this._item = item;
        this._numberPerSecond = numberPerSecond;
        this._procuder = producer;
        this._numProducers = numProducers;
    }
    get item() { return this._item; }
    get numberPerSecond() { return this._numberPerSecond; }
    get producer() { return this._procuder; }
    get numProducers() { return this._numProducers; }
}
class TotalTable {
    constructor(graph) {
        let stats = {};
        graph.visitDepthFirst((node, depth) => {
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
            next() {
                if (index < rows.length) {
                    return {
                        done: false,
                        value: rows[index++]
                    };
                }
                else {
                    return {
                        done: true,
                        value: null
                    };
                }
            }
        };
    }
}
function formatNumber(n, maxFractionDigits) {
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
var IconSize;
(function (IconSize) {
    IconSize[IconSize["Small"] = 0] = "Small";
    IconSize[IconSize["Medium"] = 1] = "Medium";
})(IconSize || (IconSize = {}));
function createImageOfItemIcon(item, iconSize = IconSize.Medium) {
    let img = document.createElement("img");
    img.src = "images/item-icons/" + item.name + ".png";
    img.width = (iconSize == IconSize.Medium) ? 25 : 16;
    img.alt = item.label;
    return img;
}
function createElementOfItems(item, numItems) {
    let div = document.createElement("div");
    let img = createImageOfItemIcon(item);
    div.appendChild(img);
    img.style.verticalAlign = "middle";
    let p = document.createElement("div");
    div.appendChild(p);
    p.style.display = "inline-block";
    p.style.verticalAlign = "middle";
    p.style.marginLeft = "0.25em";
    p.innerText = "×" + formatNumber(numItems, 2);
    return div;
}
function createElementOfProducers(producer, numProducers) {
    let div = document.createElement("div");
    let img = createImageOfItemIcon(producer.item);
    div.appendChild(img);
    img.style.verticalAlign = "middle";
    for (const module of producer.modules) {
        let img = createImageOfItemIcon(module.item, IconSize.Small);
        div.appendChild(img);
    }
    let p = document.createElement("div");
    div.appendChild(p);
    p.style.display = "inline-block";
    p.style.verticalAlign = "middle";
    p.style.marginLeft = "0.25em";
    p.innerText = "×" + formatNumber(numProducers, 2);
    return div;
}
class Greeter {
    constructor(element) {
        this.element = element;
    }
    start() {
        let graph = new RecipeGraph(Item.Rocket, 1 / 2000, new CalculationSettings(new Map([
            [Item.LowDensityStructure, new Producer(Item.AssemblingMachine3, [Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3])],
            [Item.RocketControlUnit, new Producer(Item.AssemblingMachine3, [Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3])],
            [Item.RocketFuel, new Producer(Item.AssemblingMachine3, [Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3, Module.ProductivityModule3])],
        ])));
        const showDetails = false;
        {
            let table = document.createElement('table');
            this.element.appendChild(table);
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
            let tBody = table.createTBody();
            let prevDepth = 0;
            let currentRow = tBody.insertRow();
            let stack = [];
            graph.visitDepthFirst((node, depth) => {
                if (depth <= prevDepth) {
                    currentRow = tBody.insertRow();
                }
                {
                    let cell = currentRow.insertCell();
                    cell.rowSpan = node.maxBreadth;
                    if (depth == 1) {
                        cell.appendChild(createImageOfItemIcon(node.product));
                    }
                    else {
                        cell.appendChild(createElementOfItems(node.product, node.needNumber));
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
                        cell.appendChild(createElementOfProducers(node.producer, node.numProducers));
                    }
                }
                prevDepth = depth;
            });
        }
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
    }
}
window.onload = () => {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};
//# sourceMappingURL=app.js.map