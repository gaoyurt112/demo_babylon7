// 模型加载
import { SceneLoader, DracoCompression } from '@babylonjs/core'
import "@babylonjs/loaders/gltf";  //引入插件

DracoCompression.Configuration.decoder.wasmUrl = '/public/draco_decoder_gltf.js'
DracoCompression.Configuration.decoder.wasmBinaryUrl = '/public/draco_decoder_gltf.wasm'
DracoCompression.Configuration.decoder.fallbackUrl = '/public/draco_decoder_gltf.js'

/*
模型加载函数

@name 名称
@rootUrl 模型地址
@fileName 文件名
@scene 场景
*/

export async function loadModel(name, rootUrl, fileName, scene) {
    let model = await SceneLoader.ImportMeshAsync(name, rootUrl, fileName, scene)
    return model
}



