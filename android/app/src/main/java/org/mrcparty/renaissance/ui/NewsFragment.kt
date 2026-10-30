package org.mrcparty.renaissance.ui

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.google.android.material.chip.Chip
import com.google.android.material.chip.ChipGroup
import org.mrcparty.renaissance.R
import org.mrcparty.renaissance.model.Article

class NewsFragment : Fragment() {

    private lateinit var adapter: ArticleAdapter

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        return inflater.inflate(R.layout.fragment_news, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        val mainActivity = activity as? MainActivity ?: return
        val allArticles = mainActivity.repository.getArticles()

        val recyclerView = view.findViewById<RecyclerView>(R.id.recycler_articles)
        recyclerView.layoutManager = LinearLayoutManager(requireContext())
        adapter = ArticleAdapter(allArticles)
        recyclerView.adapter = adapter

        val chipGroup = view.findViewById<ChipGroup>(R.id.chip_group_categories)

        view.findViewById<Chip>(R.id.chip_all).setOnClickListener {
            adapter.updateList(allArticles)
        }

        view.findViewById<Chip>(R.id.chip_speeches).setOnClickListener {
            val filtered = allArticles.filter { it.title.contains("Kamto", ignoreCase = true) || it.title.contains("discours", ignoreCase = true) }
            adapter.updateList(filtered)
        }

        view.findViewById<Chip>(R.id.chip_elecam).setOnClickListener {
            val filtered = allArticles.filter { it.title.contains("ELECAM", ignoreCase = true) }
            adapter.updateList(filtered)
        }

        view.findViewById<Chip>(R.id.chip_rallies).setOnClickListener {
            val filtered = allArticles.filter { it.title.contains("Douala", ignoreCase = true) || it.title.contains("rally", ignoreCase = true) }
            adapter.updateList(filtered)
        }
    }
}
