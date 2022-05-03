const PROTO_PATH = './proto/demo.proto';

var parseArgs = require('minimist');
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const HOST = process.env.SERVER_HOST;

var packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {keepCase: true,
   longs: String,
   enums: String,
   defaults: true,
   oneofs: true
  });
var demo_proto = grpc.loadPackageDefinition(packageDefinition).demo;

var argv = parseArgs(process.argv.slice(2), {
string: 'target'
});
var target;
if (argv.target) {
target = argv.target;
} else {
target = `${HOST}:50051`;
}
var client = new demo_proto.ItemService(target,grpc.credentials.createInsecure());

module.exports = client;