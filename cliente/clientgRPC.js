var PROTO_PATH = './proto/demo.proto';

var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

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

const client = new demo_proto(
  `${HOST}:50051`,
  grpc.credentials.createInsecure()
);

module.exports = client;