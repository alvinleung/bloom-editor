import { MutableRefObject, RefObject, useEffect, useRef } from "react";
import Camera from "./SHREE/Camera";
import Geometry from "./SHREE/Geometry";
import Material from "./SHREE/Material";
import Mesh from "./SHREE/Mesh";
import Renderer from "./SHREE/Renderer";
import Scene from "./SHREE/Scene";

const VERT_SHADER = require("./shader/Shader.vert");
const FRAG_SHADER = require("./shader/Shader.frag");

export function useRenderer(
  image: HTMLImageElement
): MutableRefObject<HTMLDivElement> {
  const viewportRef = useRef<HTMLDivElement>();
  const imageRef = useRef<HTMLImageElement>(image);
  if (imageRef.current !== image) {
    imageRef.current = image;
  }

  // setup shree here
  useEffect(() => {
    const renderingContext = initRenderer(viewportRef.current);

    function resizeViewport() {
      renderingContext.renderer.setSize(
        viewportRef.current.clientWidth,
        viewportRef.current.clientHeight
      );
    }

    function update(delta) {
      updateRenderer(renderingContext, imageRef);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);

    resizeViewport();
    window.addEventListener("resize", resizeViewport);
    return () => {
      window.removeEventListener("resize", resizeViewport);
    };
  }, []);

  return viewportRef;
}

interface RenderingContext {
  renderer: Renderer;
  scene: Scene;
  camera: Camera;
  geometry: Geometry;
  material: Material;
  mesh: Mesh;
}

/**
 * setup the rendering
 * @param viewportElement
 * @returns
 */
function initRenderer(viewportElement: HTMLDivElement): RenderingContext {
  // renderer
  const renderer = new Renderer();

  // remove if alread exist
  const currentCanvas = viewportElement.querySelector("canvas");
  if (currentCanvas) {
    currentCanvas.remove();
  }

  viewportElement.appendChild(renderer.domElement);

  const camera = new Camera();
  camera.position.z = 2;

  const scene = new Scene();

  const material = new Material({
    vertexShader: VERT_SHADER,
    fragmentShader: FRAG_SHADER,
  });

  const geometry = new Geometry();
  geometry.addAttribute(
    "position",
    3,
    [0.0, 0.5, 0.0, -1.0, -0.5, 0.0, 1.0, -0.5, 0.0]
  );
  geometry.addAttribute(
    "color",
    4,
    [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0]
  );
  geometry.index = [0, 1, 2];

  const mesh = new Mesh(geometry, material);
  scene.add(mesh);

  return { renderer, scene, camera, geometry, mesh, material };
}

function updateRenderer(
  { renderer, scene, camera, material }: RenderingContext,
  imageRef: RefObject<HTMLImageElement>
) {
  renderer.render(scene, camera);
}
