export class PxNode {
    constructor(service_name, node_name, properties = {}, secret = '') {
        this.service = service_name;
        this.node_name = node_name;
        this.properties = new PxNodeProperties(properties);
        this.secret = secret;
    }
}

export class PxNodeProperties {
    constructor(properties = {}) {
        Object.keys(properties).forEach(k => {
            this[k] = properties[k];
        });
    }
}

export class PxNodes {
    constructor(nodes = []) {
        this.nodes = nodes;
        this._current_idx = -1;
    }

    forEach = (cb) => {
        this.nodes.forEach(cb);
    }

    populate = (nodes) => {
        if (!Array.isArray(nodes)) {
            throw 'Array of nodes should be provided';
        }
        nodes.forEach(({
            serviceName,
            nodeName,
            properties
        }) => {
            this.add_node(new PxNode(serviceName, nodeName, properties));
        })
    }

    node = (node) => {
        if (node == parseInt(node)) {
            return this._nodeById(parseInt(node));
        }
        return this._nodeByName(node);
    }

    add = (node) => {
        if (!node instanceof PxNode) {
            throw "Node should be an instance of PxNode class";
        }
        this.nodes.push(node);
    }

    delete = (node) => {
        if (node == parseInt(node)) {
            return this._delById(parseInt(node));
        }
        return this._delByName(node);
    }

    clear = () => {
        this.nodes = [];
    }

    isEmpty = () => {
        return this.nodes.length ? true : false;
    }

    _nodeIdByName = (name) => {
        let idx = this.nodes.findIndex(node => node.node_name === name);
        if (idx >= 0) {
            return idx;
        }
        throw `Node with name '${name}' doesn't exist in the list`;
    }

    _nodeById = (id) => {
        return id < 0 ? this.nodes : this.nodes[id];
    }

    _nodeByName = (name) => {
        return this._nodeById(this._nodeIdByName(name));
    }

    _delById = (id) => {
        return this.nodes.splice(id, 1);
    }

    _delByName = (name) => {
        return this.nodes.splice(this._nodeIdByName(name), 1);
    }
}