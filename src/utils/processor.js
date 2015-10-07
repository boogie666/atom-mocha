import { normalize, Schema, arrayOf } from 'normalizr';

const test = new Schema("tests");
const suite = new Schema("suites");

suite.define({
    tests : arrayOf(test),
    suites : arrayOf(suite)
});

export default function(data){
    return normalize(data, arrayOf(suite));
}
