import bcrypt from "bcrypt";
import config from "./config";
import {errorMessages} from "./messages";

export const sendResponse = ({response, data, error = false, message}) => {
  let statusCode = 200;
  if(!data) {
    data = {};
    message = error;
    error = true;
    statusCode = 400;
  } 
  return response.status(statusCode).send({data, message, error})
}

export const hashPasswordGenerate = async (password) => {
  const output = [null];
  try {
  	const salt = await bcrypt.genSalt(config.saltRound);
    const passwordHash = await bcrypt.hash(password, salt);              
  	output[1] = passwordHash;
	}	catch (error) {
    console.log('<==== Hash Function Error ====>', error);
    return errorMessages.passwordHashing;
	}
  return output;
}

export const compareHash = async (password, passwordHash) => {
  const output = [null];
  try {
    const flag = await bcrypt.compare(password, passwordHash);
    output[1] = flag;
  } catch (error) {
    console.log("<==== compareHash function Error ====> ", error);
    return errorMessages.compareHash;
  }
  return output;
}

export const isEmptyString = (string) => {
  if (string) {
    const len = string.trim().length;
    if (len > 0) {
      return false;
    }
  }
  return true;
}
