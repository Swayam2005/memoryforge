from pyvis.network import Network


def build_demo_graph(output_file):

    net = Network(
        height="700px",
        width="100%",
        bgcolor="#111111",
        font_color="white",
        directed=True
    )

    nodes = [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "LLMs",
        "Cognee",
        "MemoryForge",
        "Gemini"
    ]

    for node in nodes:
        net.add_node(node)

    edges = [

        ("Artificial Intelligence", "Machine Learning"),

        ("Machine Learning", "Deep Learning"),

        ("Deep Learning", "Neural Networks"),

        ("Neural Networks", "LLMs"),

        ("LLMs", "Cognee"),

        ("Cognee", "MemoryForge"),

        ("MemoryForge", "Gemini")

    ]

    for edge in edges:
        net.add_edge(edge[0], edge[1])

    net.save_graph(output_file)