class GraphParser:

    def parse_text(self,text):

        words=text.split()

        return list(set(words))