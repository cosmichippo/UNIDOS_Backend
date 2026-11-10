// here I will write getter / setter functions for a file 
// that keeps a pointer to the most recent facebook post,
// and it's air quality, and some information about the time it was posted
import { error } from 'console';
import { createCipheriv } from 'crypto';
import {writeFile, readFile} from 'fs/promises';

export interface CommentMetaData{
    /** the ID for a facebook comment, provided when a new post is made to fb*/
    id: string,
    /** tells you how many times this has been updated*/
    updatecount: number
    /** the time which the comment was posted*/
    time?: string

}
interface JsonFile {
    queue: CommentMetaData[]
}

export async function getFileJSON(file:string) {
    let data;
    let out;
    try{

        data = await readFile(file, {encoding:'utf-8'});
        out = JSON.parse(data) as JsonFile;
    } catch (err){
        if (err instanceof SyntaxError) {
            console.error(`${data}, ${file}`);
        }
    }
    
        if (out === undefined) {
            throw error("getFile didn't get object")
        }
        if (!out.hasOwnProperty('queue')){
            throw error("add queue param to json file")
        }
        const arr = out.queue;
        if (!(Array.isArray(arr))) {
            throw error(`key doesn't point to an array, points to ${typeof(arr)}`)
        }
        return out
}

export async function getQueueHead(file:string, ){
    try{
        var out = await getFileJSON(file);
    }catch (err){
        console.error(err);
        return null;
    }
    
    // here we must always be sure to call our array "queue" in this JS file
    if (out.queue.length == 0) {
        return null;
    }
    const endOfArr = out.queue.length - 1;
    return out.queue[endOfArr];
}

export async function writeFileJSON(file:string, data:object) {
    // this can probably be much more efficient, and should be improved upon.
    // in order to read a new line into the file, i have to first read in the entire file
    const string = JSON.stringify(data);
    const out = await writeFile(file, string);
    // this is kinda janky, tryna do something like how c programs work
    if (out === undefined) {return 0}
    return 1;
}

export async function addToQueue(file:string, entry:CommentMetaData) {
    const out = await getFileJSON(file)
    out.queue.push(entry);
    return writeFileJSON(file, out);
}
