from pyvis.network import Network


class GraphBuilder:

    def __init__(self):

        self.net = Network(
            height="700px",
            width="100%",
            bgcolor="#111111",
            font_color="white",
            directed=True
        )

    def build_demo(self):

        nodes = [

            "MemoryForge",

            "Cognee",

            "Gemini",

            "Artificial Intelligence",

            "Machine Learning",

            "Deep Learning",

            "LLMs"

        ]

        for node in nodes:

            self.net.add_node(
                node,
                label=node
            )

        edges = [

            ("MemoryForge","Cognee"),

            ("Cognee","Gemini"),

            ("Gemini","Artificial Intelligence"),

            ("Artificial Intelligence","Machine Learning"),

            ("Machine Learning","Deep Learning"),

            ("Deep Learning","LLMs")

        ]

        for edge in edges:

            self.net.add_edge(
                edge[0],
                edge[1]
            )

    def save(self,path):

        self.net.save_graph(path)