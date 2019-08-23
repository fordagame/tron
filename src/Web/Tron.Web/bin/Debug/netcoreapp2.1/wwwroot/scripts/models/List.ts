namespace Tron {
    export class List<T> extends app.mvp.Model {
        objects: T[];
        constructor(objects: T[] = []) {
            super();
            if (objects) {
                this.objects = objects;
            }
        }

        pushRange(list: List<T>) {
            this.objects = this.objects.concat(list.objects);
        }

        push(obj: T) {
            this.objects.push(obj);
        }

        pop(): T {
            return this.objects.pop();
        }
    }
}