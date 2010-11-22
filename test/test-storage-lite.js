var Y = YUI().use('console', 'test', 'gallery-storage-lite', function (Y) {

var testCase = new Y.Test.Case({
    name: 'storage-lite tests',

    setUp: function () {
        Y.StorageLite.clear();
    },

    tearDown: function () {
        Y.StorageLite.clear();
    },

    testSetGetString: function () {
        Y.Assert.isNull(Y.StorageLite.getItem('foo'));
        Y.StorageLite.setItem('foo', 'bar');
        Y.Assert.areSame(Y.StorageLite.getItem('foo'), 'bar');
    },

    testSetGetObject: function () {
        var foo = {bar: 'baz'}, item;

        Y.Assert.isNull(Y.StorageLite.getItem('foo'));

        Y.StorageLite.setItem('foo', foo, true);
        item = Y.StorageLite.getItem('foo', true);
        
        Y.Assert.isObject(item);
        Y.Assert.areSame(item.bar, foo.bar);
    },

    testLength: function () {
        Y.Assert.areSame(Y.StorageLite.length(), 0);
        Y.StorageLite.setItem('foo', 'bar');
        Y.Assert.areSame(Y.StorageLite.length(), 1);
        Y.StorageLite.setItem('baz', 'quux');
        Y.Assert.areSame(Y.StorageLite.length(), 2);
    },

    testClear: function () {
        Y.Assert.areSame(Y.StorageLite.length(), 0);
        Y.StorageLite.setItem('foo', 'bar');
        Y.StorageLite.setItem('baz', 'qux');
        Y.Assert.areSame(Y.StorageLite.length(), 2);
        Y.StorageLite.clear();
        Y.Assert.areSame(Y.StorageLite.length(), 0);
    },

    testRemoveItem: function () {
        Y.Assert.areSame(Y.StorageLite.length(), 0);
        Y.StorageLite.setItem('foo', 'bar');
        Y.Assert.areSame(Y.StorageLite.length(), 1);
        Y.StorageLite.removeItem('foo');
        Y.Assert.areSame(Y.StorageLite.length(), 0);
    }
});

Y.Test.Runner.add(testCase);

var yconsole = new Y.Console({
    height     : '500px',
    newestOnTop: false,
    render     : '#log',
    style      : 'block',
    width      : '100%'
});

Y.StorageLite.on('storage-lite:ready', function () { Y.Test.Runner.run(); });

});
