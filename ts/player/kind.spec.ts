import * as GWM from 'gw-map';
import * as Kind from './kind';

describe('ActorKind', () => {
    test('create', () => {
        const kind = new Kind.PlayerKind({
            name: 'Test',
            attributes: { a: 1, b: 2, c: 3 },
        });

        expect(kind.attributes.get('a')).toEqual(1);
        expect(kind.attributes.get('b')).toEqual(2);
        expect(kind.attributes.get('c')).toEqual(3);
    });

    test('install', () => {
        const kind = new Kind.PlayerKind({
            name: 'Test',
            attributes: { a: 1, b: 2, c: 3 },
        });

        GWM.actor.install('Test', kind);

        const k = GWM.actor.get('Test');
        expect(k).toBe(kind);
    });
});
