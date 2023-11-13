/*
场景切换函数

@scene 场景
@engine 引擎
*/
export function useRenderLoop(scene, engine) {
    engine.stopRenderLoop();
    let activeScene = scene
    engine.runRenderLoop(() => {
        activeScene?.render()
    })

    function switchScene(scene) {
        activeScene?.detachControl()
        activeScene = scene
        activeScene?.attachControl()
    }
    return { switchScene }
}