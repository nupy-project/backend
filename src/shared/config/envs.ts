/* eslint-disable prettier/prettier */
import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  JWT_SECRET:string
  ETH_RPC_URL:string
  CONTRACT_ADDRESS:string
  PRIVATE_KEY: string;


}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    ETH_RPC_URL: joi.string().required(),
    CONTRACT_ADDRESS: joi.string().required(),
    PRIVATE_KEY: joi.string().required(),



  })
  .unknown(true);

const { error, value } = envsSchema.validate({
  ...process.env,
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  JWT_SECRET: envVars.JWT_SECRET,
  ETH_RPC_URL: envVars.ETH_RPC_URL,
  CONTRACT_ADDRESS: envVars.CONTRACT_ADDRESS,
  PRIVATE_KEY: envVars.PRIVATE_KEY,


};
